import axios from "axios";
import { format } from "date-fns";

const API_BASE_URL = "http://52.202.23.63:9091/api/v1";

const DashModel = {
  fetchPedidosIds: async (startDate, endDate) => {
    if (!startDate || !endDate) {
      throw new Error("As datas de início e fim são obrigatórias.");
    }

    const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy HH:mm");
    const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy HH:mm");

    // Obter IDs de pedidos dentro do intervalo de datas
    const response = await axios.get(`${API_BASE_URL}/pedido/date-between`, {
      params: {
        dataInicio: formattedStartDate,
        dataFim: formattedEndDate,
      },
    });

    return response.data.map((pedido) => pedido.id); // Retorna apenas os IDs dos pedidos
  },

  fetchItensPorPedidos: async (pedidoIds) => {
    if (!pedidoIds || pedidoIds.length === 0) {
      throw new Error("Nenhum pedido encontrado para o intervalo selecionado.");
    }

    const requests = pedidoIds.map((id) => {
      return axios.post(`${API_BASE_URL}/item-pedido/criteria`, {
        pedido: { id },
      });
    });

    // Aguarda todas as requisições para obter itens dos pedidos
    const responses = await Promise.all(requests);
    return responses.flatMap((response) => response.data); // Combina os dados de todos os pedidos
  },

  transformGraficoData: (itens) => {
    const mesaData = itens.reduce((acc, item) => {
      const mesa = item.mesa.codigoMesa; // Identificador da mesa
      const pedidoId = item.pedido.id; // Identificador do pedido

      if (!acc[mesa]) {
        acc[mesa] = { mesa, quantidade: 0, totalProdutos: 0, pedidosUnicos: new Set() };
      }

      // Adiciona o ID do pedido ao conjunto (para contar pedidos únicos)
      acc[mesa].pedidosUnicos.add(pedidoId);

      // Soma a quantidade de produtos
      acc[mesa].totalProdutos += item.qtdProduto;

      return acc;
    }, {});

    // Converte os dados para o formato esperado pelos gráficos
    return Object.values(mesaData).map((data) => ({
      mesa: data.mesa,
      quantidade: data.pedidosUnicos.size, // Total de pedidos únicos
      totalProdutos: data.totalProdutos, // Total de produtos
    }));
  },
};

export default DashModel;
