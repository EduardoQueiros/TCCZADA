import PedidoModel from "../Model/PedidoModel";
import axios from "axios";
import { formatDateTime } from "../../../Components/DateUtils";
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:9091/api/v1";

const PreferenciasControllerPedido = {
    handleEstouSatisfeito: async (clienteId) => {
        try {
            console.log("Início do fluxo 'Estou Satisfeito'");

            if (!clienteId) {
                throw new Error("ID do cliente não encontrado.");
            }

            // Recupera o ID do pedido do localStorage
            const userLogin = JSON.parse(localStorage.getItem("userLogin"));
            const pedidoId = userLogin?.pedidoId;

            if (!pedidoId) {
                throw new Error("ID do pedido não encontrado.");
            }

            // Obtém os detalhes do pedido para recuperar a dataHoraAbertura
            console.log(`Buscando informações do pedido ${pedidoId}...`);
            const pedidoResponse = await axios.post(`${API_BASE_URL}/pedido/criteria`, { id: pedidoId });
            const pedido = pedidoResponse.data[0];

            if (!pedido || !pedido.dataHoraAbertura) {
                throw new Error("Erro ao obter a dataHoraAbertura do pedido.");
            }

            const dataHoraAbertura = pedido.dataHoraAbertura;
            console.log("DataHoraAbertura obtida:", dataHoraAbertura);

            const dataHoraAtual = formatDateTime(new Date());

            // Atualiza o pedido com os dados finais, incluindo dataHoraAbertura
            const pedidoPayload = {
                id: pedidoId,
                dataHoraAbertura: dataHoraAbertura, // Inclui a dataHoraAbertura original
                dataHoraFechamento: dataHoraAtual,
                totalPedido: 0, // Atualize o valor total conforme necessário
                status: "FECHADO",
                cliente: { id: clienteId },
            };

            console.log("Payload do pedido para atualização:", JSON.stringify(pedidoPayload, null, 2));

            // Envia a requisição PUT para atualizar o pedido
            await axios.put(`${API_BASE_URL}/pedido`, pedidoPayload);
            console.log("Pedido atualizado com sucesso.");

            // Busca as preferências do cliente para vincular ao pedido
            const clientePreferenciaPayload = { cliente: { id: clienteId } };
            console.log("Buscando itens do cliente em cliente-preferencia...");

            const clientePreferenciasResponse = await axios.post(
                `${API_BASE_URL}/cliente-preferencia/criteria`,
                clientePreferenciaPayload
            );

            const itens = clientePreferenciasResponse.data;
            if (!itens || itens.length === 0) {
                throw new Error("Nenhum item encontrado em cliente-preferencia para o cliente.");
            }

            // Prepara o payload dos itens para associar ao pedido
            const itensPayload = itens.map((item) => ({
                qtdProduto: 1,
                cliente: { id: clienteId },
                mesa: { id: item.cliente.mesa.id },
                produto: { id: item.produto.id },
                pedido: { id: pedidoId },
            }));

            console.log("Payload dos itens preparado como array:", JSON.stringify(itensPayload, null, 2));

            // Adiciona os itens ao pedido
            await PedidoModel.adicionarItensAoPedido(itensPayload);
            console.log("Itens adicionados ao pedido com sucesso!");

            // Atualiza o status dos itens de cliente-preferencia para "EM_ABERTO"
            const itensAtualizados = itens.map((item) => ({
                id: item.id,
                status: "EM_ABERTO",
                cliente: { id: clienteId },
                produto: { id: item.produto.id },
            }));

            console.log("Atualizando status dos itens para 'EM_ABERTO':", JSON.stringify(itensAtualizados, null, 2));

            for (const item of itensAtualizados) {
                await axios.put(`${API_BASE_URL}/cliente-preferencia`, item);
                console.log(`Status do item ${item.id} atualizado para EM_ABERTO.`);
            }

            // Exibe mensagem de sucesso
            Swal.fire({
                title: "Sucesso!",
                text: "Pedido finalizado, itens atualizados e status ajustado com sucesso.",
                icon: "success",
                confirmButtonText: "OK",
            });

            return { success: true, message: "Pedido finalizado e itens ajustados com sucesso!" };
        } catch (err) {
            console.error("Erro no fluxo 'Estou Satisfeito':", err.response?.data || err.message || err);

            // Exibe mensagem de erro
            Swal.fire({
                title: "Erro",
                text: err.response?.data?.mensagem || "Erro ao finalizar o pedido e atualizar os itens.",
                icon: "error",
                confirmButtonText: "OK",
            });

            throw new Error(err.response?.data?.mensagem || "Erro ao finalizar o pedido e atualizar os itens.");
        }
    },
};

export default PreferenciasControllerPedido;
