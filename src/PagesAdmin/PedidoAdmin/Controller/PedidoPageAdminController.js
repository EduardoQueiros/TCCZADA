import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function PedidoPageAdminController(searchTerm) {
    const [pedidos, setPedidos] = useState([]);
    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchPedidos = useCallback(async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get("http://52.202.23.63:9091/api/v1/cliente-preferencia");

            // Filtra os pedidos pelo status "RECEBIDO"
            const pedidosFiltrados = response.data.filter((pedido) => pedido.status === "RECEBIDO");

            // Agrupa os pedidos pelo ID do cliente e separa produtos/adicionais
            const pedidosAgrupados = pedidosFiltrados.reduce((acc, pedido) => {
                const clienteId = pedido.cliente?.id || "desconhecido";
                const clienteNome = pedido.cliente?.nome || "Cliente não informado";
                const mesaId = pedido.cliente?.mesa.id || "Não informado";

                if (!acc[clienteId]) {
                    acc[clienteId] = {
                        id: clienteId,
                        cliente: clienteNome,
                        mesa: mesaId,
                        adicionais: [],
                        produtos: [],
                    };
                }

                const produto = {
                    nome: pedido.produto?.descricao || "Produto não informado",
                    quantidade: 1,
                };

                if (pedido.produto?.tipoProduto.id === 6) {
                    acc[clienteId].adicionais.push(produto);
                } else {
                    acc[clienteId].produtos.push(produto);
                }

                return acc;
            }, {});

            const pedidosFormatados = Object.values(pedidosAgrupados);
            setPedidos(pedidosFormatados);
            setFilteredPedidos(pedidosFormatados);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPedidos();
    }, [fetchPedidos]);

    // Filtra os pedidos pelo termo de busca
    useEffect(() => {
        const filtrados = pedidos.filter(
            (pedido) =>
                !searchTerm ||
                pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pedido.mesa.toString().includes(searchTerm) ||
                pedido.produtos.some((produto) =>
                    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
                ) ||
                pedido.adicionais.some((adicional) =>
                    adicional.nome.toLowerCase().includes(searchTerm.toLowerCase())
                )
        );

        setFilteredPedidos(filtrados);
    }, [searchTerm, pedidos]);

    return { pedidos: filteredPedidos, loading, error, refreshPedidos: fetchPedidos };
}

export default PedidoPageAdminController;
