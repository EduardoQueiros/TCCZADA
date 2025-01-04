import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModel from "../Model/LoginModel";
import axios from "axios";

function LoginController() {
    const [loginData, setLoginData] = useState(LoginModel());
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    // Função para gerar um e-mail válido sem espaços
    const generateValidEmail = (nomeCliente) => {
        // Remove espaços e concatena tudo
        const cleanedName = nomeCliente
            .trim() // Remove espaços extras do início e fim
            .replace(/\s+/g, ""); // Remove todos os espaços intermediários

        return `${cleanedName.toLowerCase()}@example.com`;
    };

    const handleLogin = async () => {
        if (loginData.mesa !== "" && loginData.nomeCliente !== "") {
            try {
                // Gera um e-mail válido a partir do nomeCliente
                const validEmail = generateValidEmail(loginData.nomeCliente);

                // Faz o POST para criar o cliente com a mesa associada
                const response = await axios.post("http://localhost:9091/api/v1/cliente", [
                    {
                        nome: loginData.nomeCliente,
                        email: validEmail, // Usa o e-mail formatado sem espaços
                        mesa: {
                            id: parseInt(loginData.mesa), // Garante que o ID da mesa seja numérico
                        },
                    },
                ]);

                console.log("Resposta da API:", response.data);

                // Obtém o ID do cliente da resposta
                const clienteId = response.data?.[0]?.id;

                // Atualiza o clienteId no loginData
                const updatedLoginData = { ...loginData, clienteId };
                setLoginData(updatedLoginData);

                // Salva os dados no localStorage
                localStorage.setItem("userLogin", JSON.stringify(updatedLoginData));

                // Redireciona para a página de preferências
                navigate("/Preferencias");
            } catch (error) {
                console.error("Erro ao realizar login:", error.response?.data || error.message);
                alert(
                    error.response?.data?.erros?.[0]?.mensagem ||
                    "Erro ao realizar login. Tente novamente."
                );
            }
        } else {
            alert("Preencha os campos corretamente.");
        }
    };

    return { loginData, handleInputChange, handleLogin };
}

export default LoginController;
