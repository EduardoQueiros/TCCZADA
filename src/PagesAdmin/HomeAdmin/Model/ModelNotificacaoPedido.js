import axios from "axios";
import { format } from "date-fns"; // Importa a função de formatação do date-fns

function ModelNotificacaoPedido() {
    const baseURL = "http://44.200.213.219:9091/api/v1";

    const getPedidosNotificacao = async () => {
        const response = await axios.post(`${baseURL}/pedido/criteria`, { status: "NOTIFICA" });
        return response.data;
    };

    const getItensPedido = async (pedidoId) => {
        const response = await axios.post(`${baseURL}/item-pedido/criteria`, {
            pedido: { id: pedidoId }
        });
        return response.data;
    };

    const atualizarStatusPedido = async (pedido) => {
        // Formata as datas para o formato "dd-MM-yyyy HH:mm"
        const updatedPedido = {
            id: pedido.id,
            dataHoraAbertura: format(new Date(pedido.dataHoraAbertura), "dd-MM-yyyy HH:mm"),
            dataHoraFechamento: format(new Date(), "dd-MM-yyyy HH:mm"), // Data de fechamento atual
            totalPedido: pedido.totalPedido || 0, // Define 0 se não houver valor
            status: 2, // Atualiza o status para 2
            cliente: {
                id: pedido.cliente.id // ID do cliente associado ao pedido
            }
        };

        console.log("Payload enviado para a API:", JSON.stringify(updatedPedido, null, 2));

        try {
            // Requisição PUT com o payload no formato esperado
            const response = await axios.put(`${baseURL}/pedido`, updatedPedido);
            console.log("Resposta da API:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar o pedido:", error.response?.data || error.message);
            console.error("Detalhes do erro:", error.response?.data);
            throw error;
        }
    };

    return {
        getPedidosNotificacao,
        getItensPedido,
        atualizarStatusPedido
    };
}

export default ModelNotificacaoPedido;
