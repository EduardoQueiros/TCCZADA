import axios from "axios";
import { format } from "date-fns";

const API_BASE_URL = "http://localhost:9091/api/v1";

const RelatorioModel = {
  fetchPedidosByDateRange: async (startDate, endDate) => {
    try {
      // Formatação para "dd-MM-yyyy HH:mm"
      const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy HH:mm");
      const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy HH:mm");

      console.log("Parâmetros enviados para API date-between:", {
        dataInicio: formattedStartDate,
        dataFim: formattedEndDate,
      });

      const response = await axios.get(`${API_BASE_URL}/pedido/date-between`, {
        params: {
          dataInicio: formattedStartDate,
          dataFim: formattedEndDate,
        },
      });

      console.log("Pedidos recebidos no intervalo:", response.data);

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar pedidos no intervalo:", error.response?.data || error.message);
      throw new Error(error.response?.data?.mensagem || "Erro ao buscar pedidos no intervalo.");
    }
  },

  fetchItemPedidos: async (pedidoId) => {
    try {
      const body = { pedido: { id: pedidoId } };

      console.log("Payload enviado para buscar itens do pedido:", body);

      const response = await axios.post(`${API_BASE_URL}/item-pedido/criteria`, body);

      console.log("Itens do pedido recebidos:", response.data);

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar itens do pedido:", error.response?.data || error.message);
      throw new Error(error.response?.data?.mensagem || "Erro ao buscar itens do pedido.");
    }
  },
};

export default RelatorioModel;
