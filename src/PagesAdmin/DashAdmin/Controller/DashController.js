import { useState, useEffect } from "react";
import DashModel from "../Model/DashModel";
import Swal from "sweetalert2";

function DashController() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [graficoPedidosPorMesa, setGraficoPedidosPorMesa] = useState(null);

  const fetchDashboardData = async () => {
    if (!startDate || !endDate || !selectedType) {
      Swal.fire({
        icon: "warning",
        title: "Dados inválidos",
        text: "Por favor, selecione o tipo de relatório e o intervalo de datas.",
        confirmButtonText: "Ok",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (selectedType === "PedidosPorMesa") {
        // Passo 1: Obter os IDs dos pedidos dentro do intervalo
        const pedidoIds = await DashModel.fetchPedidosIds(startDate, endDate);

        if (pedidoIds.length === 0) {
          Swal.fire({
            icon: "info",
            title: "Nenhum dado encontrado",
            text: "Não foram encontrados pedidos no intervalo selecionado.",
            confirmButtonText: "Ok",
          });
          setGraficoPedidosPorMesa(null); // Limpa os dados do gráfico
          return;
        }

        // Passo 2: Obter itens desses pedidos
        const itens = await DashModel.fetchItensPorPedidos(pedidoIds);

        if (itens.length === 0) {
          Swal.fire({
            icon: "info",
            title: "Nenhum item encontrado",
            text: "Não foram encontrados itens associados aos pedidos selecionados.",
            confirmButtonText: "Ok",
          });
          setGraficoPedidosPorMesa(null);
          return;
        }

        // Passo 3: Transformar os dados para os gráficos
        const graficoData = DashModel.transformGraficoData(itens);
        setGraficoPedidosPorMesa(graficoData);

        // Alerta de sucesso
        Swal.fire({
          icon: "success",
          title: "Dados carregados com sucesso",
          text: "Os dados do gráfico foram carregados com sucesso!",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Erro ao carregar dados",
        text: err.message,
        confirmButtonText: "Ok",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate && selectedType) {
      fetchDashboardData();
    }
  }, [startDate, endDate, selectedType]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedType,
    setSelectedType,
    isLoading,
    error,
    graficoPedidosPorMesa,
    fetchDashboardData,
  };
}

export default DashController;
