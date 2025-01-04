import axios from "axios";
import { useEffect, useState } from "react";

function RelPedidoPorMesa({ startDate, endDate }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemPedidos, setItemPedidos] = useState([]);

    useEffect(() => {
        const fetchItemPedidos = async () => {
            try {
                const response = await axios.get("http://localhost:9091/api/v1/item-pedido");
                setItemPedidos(response.data);
            } catch (err) {
                setError(err);
                console.error("Erro ao carregar pedidos:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItemPedidos();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading pedidos</div>;

    // Filtrando pedidos pela dataHoraAbertura e dataHoraFechamento
    const filteredPedidos = itemPedidos.filter(itemPedido => {
        const aberturaTimestamp = itemPedido.dataHoraAbertura; // Presumindo que é um timestamp
        const fechamentoTimestamp = itemPedido.dataHoraFechamento; // Presumindo que é um timestamp

        const start = startDate ? new Date(startDate).getTime() : null; // Convertendo para timestamp
        const end = endDate ? new Date(endDate).getTime() : null; // Convertendo para timestamp

        const withinStartDate = !start || aberturaTimestamp >= start;
        const withinEndDate = !end || fechamentoTimestamp <= end;

        return withinStartDate && withinEndDate;
    });

    // Agrupando pedidos por mesa_id
    const groupedPedidos = filteredPedidos.reduce((acc, itemPedido) => {
        const mesaId = itemPedido.mesa.id; // Usando mesa.id para agrupar
        const clienteId = itemPedido.cliente_id; // Captura o cliente ID

        if (!acc[mesaId]) {
            acc[mesaId] = {
                mesaId,
                totalPedidos: 0,
                clientes: [], // Lista para todos os clientes
            };
        }

        // Incrementa o total de pedidos para a mesa
        acc[mesaId].totalPedidos += 1;

        // Adiciona o cliente à lista
        acc[mesaId].clientes.push(clienteId);

        return acc;
    }, {});

    // Calculando os dados finais
    const pedidosFiltrados = Object.values(groupedPedidos).map(pedido => ({
        mesaId: pedido.mesaId,
        totalClientes: pedido.clientes.length, // Total de clientes (sem unicidade)
        totalPedidos: pedido.totalPedidos,
        listaClientes: pedido.clientes // Mantém a lista de todos os clientes
    }));

    return (
        <div>
            {pedidosFiltrados.map((pedido, index) => (
                <div key={index} className="bg-gray-200 mt-4 ml-3 mr-3 rounded-lg p-3">
                    <h1 className="text-3xl ml-3">Mesa {pedido.mesaId}</h1>
                    <p className="ml-3">Total de Clientes da Mesa: {pedido.totalClientes}</p>
                    <p className="ml-3">Total de Pedidos: {pedido.totalPedidos}</p>
                </div>
            ))}
        </div>
    );
}

export default RelPedidoPorMesa;
