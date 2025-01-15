import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModel from "../Model/LoginModel";
import axios from "axios";
import Swal from "sweetalert2";

function LoginController() {
    const [loginData, setLoginData] = useState(LoginModel());
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const generateValidEmail = (nomeCliente) => {
        return `${nomeCliente.trim().replace(/\s+/g, "").toLowerCase()}@example.com`;
    };

    const verificarMesa = async (mesaId) => {
        try {
            const payload = {
                id: mesaId,
                codigoMesa: String(mesaId),
            };
            console.log("Verificando mesa com payload:", JSON.stringify(payload, null, 2));

            const response = await axios.post("https://nova-api-l5ht.onrender.com/api/v1/mesa/criteria", payload);

            if (response.data && response.data.length > 0) {
                console.log("Mesa encontrada:", response.data);
                return true;
            } else {
                throw new Error("Mesa não encontrada.");
            }
        } catch (error) {
            console.error("Erro ao verificar mesa:", error);
            Swal.fire({
                title: "Erro",
                text: "A mesa não foi encontrada. Verifique o ID da mesa e tente novamente.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return false;
        }
    };

    const criarPedido = async (clienteId) => {
        try {
            const pedidoPayload = [
                {
                    dataHoraFechamento: null,
                    totalPedido: null,
                    status: null,
                    cliente: { id: clienteId },
                },
            ];
            console.log("Criando pedido com payload:", JSON.stringify(pedidoPayload, null, 2));

            const response = await axios.post("https://nova-api-l5ht.onrender.com/api/v1/pedido", pedidoPayload);

            if (response.data && response.data.length > 0) {
                const pedido = response.data[0];
                console.log("Pedido criado com sucesso:", pedido);
                return pedido.id;
            } else {
                throw new Error("Erro ao criar o pedido.");
            }
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            throw new Error("Erro ao criar pedido.");
        }
    };

    const buscarPedidoPorCliente = async (clienteId) => {
        try {
            const payload = { cliente: { id: clienteId } };
            console.log("Buscando pedido com payload:", JSON.stringify(payload, null, 2));

            const response = await axios.post("https://nova-api-l5ht.onrender.com/api/v1/pedido/criteria", payload);

            if (response.data && response.data.length > 0) {
                const pedido = response.data[0];
                console.log("Pedido encontrado para o cliente:", pedido);
                return pedido.id;
            } else {
                throw new Error("Pedido não encontrado para o cliente.");
            }
        } catch (error) {
            console.error("Erro ao buscar pedido:", error);
            throw new Error("Erro ao buscar pedido.");
        }
    };

    const handleLogin = async () => {
        if (loginData.mesa && loginData.nomeCliente) {
            try {
                const mesaValida = await verificarMesa(parseInt(loginData.mesa, 10));
                if (!mesaValida) return;

                const validEmail = generateValidEmail(loginData.nomeCliente);
                const clientePayload = [
                    {
                        nome: loginData.nomeCliente,
                        email: validEmail,
                        mesa: {
                            id: parseInt(loginData.mesa, 10),
                        },
                    },
                ];
                console.log("Enviando payload do cliente:", JSON.stringify(clientePayload, null, 2));

                const clienteResponse = await axios.post("https://nova-api-l5ht.onrender.com/api/v1/cliente", clientePayload);
                const clienteId = clienteResponse.data?.[0]?.id;

                if (!clienteId) {
                    throw new Error("Erro ao obter o ID do cliente.");
                }
                console.log("Cliente criado com sucesso. ID:", clienteId);

                let pedidoId;
                try {
                    pedidoId = await criarPedido(clienteId);
                } catch (error) {
                    console.warn("Erro ao criar pedido diretamente. Tentando buscar pedido associado.");
                    pedidoId = await buscarPedidoPorCliente(clienteId);
                }

                if (!pedidoId) {
                    throw new Error("Erro ao obter o ID do pedido.");
                }

                console.log("Pedido associado ao cliente. ID do pedido:", pedidoId);

                const userLogin = { clienteId, pedidoId };
                localStorage.setItem("userLogin", JSON.stringify(userLogin));

                Swal.fire({
                    title: "Login realizado!",
                    text: "Bem-vindo ao sistema.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => navigate("/Preferencias"));
            } catch (error) {
                console.error("Erro no fluxo de login:", error);

                Swal.fire({
                    title: "Erro",
                    text: error.message || "Erro ao realizar login ou criar pedido. Tente novamente.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } else {
            Swal.fire({
                title: "Atenção",
                text: "Preencha todos os campos corretamente.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    };

    return { loginData, handleInputChange, handleLogin };
}

export default LoginController;
