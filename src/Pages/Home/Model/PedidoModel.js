import axios from "axios";

const API_BASE_URL = "http://52.202.23.63:9091/api/v1";

const PedidoModel = {
    criarPedido: async (payload) => {
      try {
        console.log("Payload enviado para criar pedido:", JSON.stringify(payload, null, 2));
        const response = await axios.post(`${API_BASE_URL}/pedido`, payload);
  
        console.log("Retorno do backend para criação do pedido:", JSON.stringify(response.data || {}, null, 2));
  
        return response.data;
      } catch (error) {
        console.error("Erro ao criar pedido:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao criar pedido.");
      }
    },
  
    buscarPedidoPorCliente: async (clienteId) => {
      try {
        const payload = { cliente: { id: clienteId } };
  
        console.log("Payload enviado para buscar pedido:", JSON.stringify(payload, null, 2));
  
        const response = await axios.post(`${API_BASE_URL}/pedido/criteria`, payload);
  
        console.log("Pedido retornado pelo backend:", JSON.stringify(response.data, null, 2));
  
        return response.data; // Retorna o pedido encontrado
      } catch (error) {
        console.error("Erro ao buscar pedido:", error.response?.data || error.message);
        throw new Error("Erro ao buscar pedido.");
      }
    },
  
    adicionarItensAoPedido: async (itensPayload) => {
      try {
        console.log("Payload enviado para adicionar itens ao pedido:", JSON.stringify(itensPayload, null, 2));
        const response = await axios.post(`${API_BASE_URL}/item-pedido`, itensPayload);
        return response.data;
      } catch (error) {
        console.error("Erro ao adicionar itens ao pedido:", error.response?.data || error.message);
        throw new Error(error.response?.data?.mensagem || "Erro ao adicionar itens ao pedido.");
      }
    },
  };
  
  export default PedidoModel;
  