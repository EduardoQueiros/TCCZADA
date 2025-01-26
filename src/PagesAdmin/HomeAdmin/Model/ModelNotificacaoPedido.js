import axios from "axios";
import { format, parse, isValid } from "date-fns"; // Importa funções do date-fns

function ModelNotificacaoPedido() {
    const baseURL = "https://nova-api-l5ht.onrender.com/api/v1";

    const getPedidosNotificacao = async () => {
        try {
            const response = await axios.post(`${baseURL}/pedido/criteria`, { status: "NOTIFICA" });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const getItensPedido = async (pedidoId) => {
        try {
            const response = await axios.post(`${baseURL}/item-pedido/criteria`, {
                pedido: { id: pedidoId },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const atualizarStatusPedido = async (pedido) => {

        if (!pedido || !pedido.id || !pedido.cliente?.id) {
            throw new Error("Pedido inválido. Certifique-se de que todos os campos obrigatórios estão preenchidos.");
        }

        // Verifica e valida a dataHoraAbertura
        const parsedAbertura = parse(pedido.dataHoraAbertura, "dd-MM-yyyy HH:mm", new Date());
        if (!isValid(parsedAbertura)) {
            throw new Error(`Data de abertura inválida: ${pedido.dataHoraAbertura}`);
        }

        try {
            // Formata as datas para o formato "dd-MM-yyyy HH:mm"
            const dataHoraAberturaFormatada = format(parsedAbertura, "dd-MM-yyyy HH:mm");
            const dataHoraFechamentoFormatada = format(new Date(), "dd-MM-yyyy HH:mm");

            const updatedPedido = {
                id: pedido.id,
                dataHoraAbertura: dataHoraAberturaFormatada,
                dataHoraFechamento: dataHoraFechamentoFormatada,
                totalPedido: pedido.totalPedido || 0, // Define 0 se não houver valor
                status: "FECHADO", // Atualiza o status para "FECHADO"
                cliente: {
                    id: pedido.cliente.id, // ID do cliente associado ao pedido
                },
            };


            // Requisição PUT com o payload no formato esperado
            const response = await axios.put(`${baseURL}/pedido`, updatedPedido);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        getPedidosNotificacao,
        getItensPedido,
        atualizarStatusPedido,
    };
}

export default ModelNotificacaoPedido;
