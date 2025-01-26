import ModelNotificacaoPedido from "../Model/ModelNotificacaoPedido";

function ControllerNotificacaoPedido() {
    const model = ModelNotificacaoPedido();

    const carregarNotificacoes = async (setNotificacoes) => {
        try {
            const pedidos = await model.getPedidosNotificacao();

            // Verifica se pedidos foi retornado como um array
            if (!Array.isArray(pedidos)) {
                console.warn("Resposta inesperada ao buscar notificações:", pedidos);
                return [];
            }

            const notificacoes = await Promise.all(
                pedidos.map(async (pedido) => {
                    try {
                        const itens = await model.getItensPedido(pedido.id);
                        return {
                            ...pedido,
                            itens,
                        };
                    } catch (error) {
                        console.error(`Erro ao buscar itens para o pedido ${pedido.id}:`, error.message);
                        return { ...pedido, itens: [] }; // Retorna o pedido sem itens caso ocorra erro
                    }
                })
            );

            if (setNotificacoes) {
                setNotificacoes(notificacoes); // Atualiza o estado no componente, se fornecido
            }

            return notificacoes; // Retorna as notificações para uso adicional
        } catch (error) {
            console.error("Erro ao carregar notificações:", error.message);
            return []; // Retorna uma lista vazia em caso de erro
        }
    };

    const confirmarPedido = async (pedido, atualizarLista) => {
        try {
            if (!pedido || !pedido.id) {
                throw new Error("Pedido inválido. Verifique os dados antes de confirmar.");
            }

            await model.atualizarStatusPedido(pedido);

            if (atualizarLista) {
                atualizarLista(); // Atualiza a lista de notificações, se callback fornecido
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
