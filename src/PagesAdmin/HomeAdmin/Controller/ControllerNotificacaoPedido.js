import ModelNotificacaoPedido from "../Model/ModelNotificacaoPedido";

function ControllerNotificacaoPedido() {
    const model = ModelNotificacaoPedido();

    const carregarNotificacoes = async (setNotificacoes) => {
        const pedidos = await model.getPedidosNotificacao();
        const notificacoes = await Promise.all(
            pedidos.map(async (pedido) => {
                const itens = await model.getItensPedido(pedido.id);
                return {
                    ...pedido,
                    itens
                };
            })
        );
        setNotificacoes(notificacoes);
    };

    const confirmarPedido = async (pedido, atualizarLista) => {
        try {
            await model.atualizarStatusPedido(pedido);
            atualizarLista();
        } catch (error) {
            console.error("Erro ao confirmar o pedido:", error.message);
            alert("Erro ao confirmar o pedido. Verifique os dados e tente novamente.");
        }
    };

    return {
        carregarNotificacoes,
        confirmarPedido
    };
}

export default ControllerNotificacaoPedido;
