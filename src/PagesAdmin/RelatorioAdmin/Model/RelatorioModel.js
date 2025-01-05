import axios from "axios";

const API_BASE_URL = "http://localhost:9091/api/v1";

const RelatorioModel = {
  fetchItemPedidos: async (mesaId, startDate, endDate) => {
    try {
      // Construção do body para o filtro
      const body = {
        mesa: {
          id: mesaId,
        },
        ...(startDate && { dataHoraAberturaInicio: startDate }), // Campo correto para data de início
        ...(endDate && { dataHoraFechamentoFim: endDate }), // Campo correto para data de fim
      };

      console.log("Payload enviado para buscar itens pedidos:", JSON.stringify(body, null, 2));

      // POST para a API
      const response = await axios.post(`${API_BASE_URL}/item-pedido/criteria`, body);

      console.log("Resposta recebida para itens pedidos:", response.data);

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar itens pedidos:", error.response?.data || error.message);
      throw new Error(error.response?.data?.mensagem || "Erro ao buscar itens pedidos.");
    }
  },

  fetchMesas: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/mesa`);

      console.log("Mesas recebidas:", response.data);

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar mesas:", error.response?.data || error.message);
      throw new Error(error.response?.data?.mensagem || "Erro ao buscar mesas.");
    }
  },
};

export default RelatorioModel;
