import axios from "axios";

const API_BASE_URL = "https://nova-api-l5ht.onrender.com/api/v1";

const PedidoModel = {
    criarPedido: async (payload) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/pedido`, payload);
  
  
        return response.data;
      } catch (error) {
        console.error("Erro ao criar pedido:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao criar pedido.");
      }
    },
  
    buscarPedidoPorCliente: async (clienteId) => {
      try {
        const payload = { cliente: { id: clienteId } };
  
  
        const response = await axios.post(`${API_BASE_URL}/pedido/criteria`, payload);
  
  
        return response.data; // Retorna o pedido encontrado
      } catch (error) {
        console.error("Erro ao buscar pedido:", error.response?.data || error.message);
        throw new Error("Erro ao buscar pedido.");
      }
    },
  
    adicionarItensAoPedido: async (itensPayload) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/item-pedido`, itensPayload);
        return response.data;
      } catch (error) {
        console.error("Erro ao adicionar itens ao pedido:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao adicionar itens ao pedido.");
      }
    },
  };
  
  export default PedidoModel;
  