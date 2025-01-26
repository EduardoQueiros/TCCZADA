import ModelNotificacaoPedido from "../Model/ModelNotificacaoPedido";

function ControllerNotificacaoPedido() {
    const model = ModelNotificacaoPedido();

    const carregarNotificacoes = async (setNotificacoes) => {
        try {
            const pedidos = await model.getPedidosNotificacao();

            if (!Array.isArray(pedidos)) {
                console.warn("Resposta inesperada ao buscar notificações:", pedidos);
                return [];
            }

            const notificacoes = await Promise.all(
                pedidos.map(async (pedido) => {
                    try {
                        const itens = await model.getItensPedido(pedido.id);

                        // Agrupa itens pelo produto para consolidar duplicados
                        const itensAgrupados = itens.reduce((acc, item) => {
                            const produtoId = item.produto.id;

                            if (!acc[produtoId]) {
                                acc[produtoId] = {
                                    id: produtoId,
                                    descricao: item.produto.descricao,
                                    qtdProduto: 0,
                                };
                            }

                            acc[produtoId].qtdProduto += item.qtdProduto;

                            return acc;
                        }, {});

                        return {
                            ...pedido,
                            itens: Object.values(itensAgrupados), // Converte o agrupamento para uma lista
                        };
                    } catch (error) {
                        console.error(`Erro ao buscar itens para o pedido ${pedido.id}:`, error.message);
                        return { ...pedido, itens: [] }; // Retorna o pedido sem itens caso ocorra erro
                    }
                })
            );

            if (setNotificacoes) {
                setNotificacoes(notificacoes);
            }

            return notificacoes;
        } catch (error) {
            console.error("Erro ao carregar notificações:", error.message);
            return [];
        }
    };

    const confirmarPedido = async (pedido, atualizarLista) => {
        try {
            if (!pedido || !pedido.id) {
                throw new Error("Pedido inválido. Verifique os dados antes de confirmar.");
            }

            await model.atualizarStatusPedido(pedido);

            if (atualizarLista) {
                atualizarLista();
            }

            console.log(`Pedido ${pedido.id} confirmado com sucesso.`);
        } catch (error) {
            console.error("Erro ao confirmar o pedido:", error.message);
            alert("Erro ao confirmar o pedido. Verifique os dados e tente novamente.");
        }
    };

    return {
        carregarNotificacoes,
        confirmarPedido,
    };
}

export default ControllerNotificacaoPedido;
