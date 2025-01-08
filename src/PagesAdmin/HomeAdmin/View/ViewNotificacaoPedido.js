import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import ControllerNotificacaoPedido from "../Controller/ControllerNotificacaoPedido";

function ViewNotificacaoPedido() {
    const [notificacoes, setNotificacoes] = useState([]);
    const controller = useMemo(() => ControllerNotificacaoPedido(), []);

    useEffect(() => {
        const carregarNotificacoes = async () => {
            await controller.carregarNotificacoes(setNotificacoes);
        };

        // Carrega notificações inicialmente
        carregarNotificacoes();

        // Configura intervalo para atualização periódica
        const intervalId = setInterval(() => {
            carregarNotificacoes();
        }, 5000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(intervalId);
    }, [controller]);

    const handleConfirmar = (pedido) => {
        if (!pedido.id || !pedido.dataHoraAbertura || !pedido.cliente?.id) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Pedido incompleto! Verifique os dados antes de continuar."
            });
            return;
        }

        Swal.fire({
            title: "Você tem certeza?",
            text: `Deseja confirmar o atendimento para o pedido da Mesa ${pedido.cliente.mesa.codigoMesa}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, confirmar!"
        }).then((result) => {
            if (result.isConfirmed) {
                controller.confirmarPedido(pedido, () => {
                    controller.carregarNotificacoes(setNotificacoes);
                    Swal.fire(
                        "Confirmado!",
                        "O atendimento foi confirmado com sucesso.",
                        "success"
                    );
                });
            }
        });
    };

    return (
        <div
            className="p-6 bg-white bg-opacity-90 rounded-2xl shadow-2xl 
                       w-full max-w-[500px] sm:max-w-[600px] lg:max-w-[700px] 
                       transform scale-95 transition-all duration-300 hover:scale-100 mx-auto"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Notificações de Pedidos</h2>
            {notificacoes.length > 0 ? (
                <div className="space-y-6">
                    {notificacoes.map((notificacao) => (
                        <div
                            key={notificacao.id}
                            className="border border-gray-200 p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white bg-opacity-80"
                        >
                            <p className="mb-2">
                                <strong>Mesa:</strong> {notificacao.cliente.mesa.codigoMesa}
                            </p>
                            <p className="mb-2">
                                <strong>Cliente:</strong> {notificacao.cliente.nome}
                            </p>
                            <ul className="mb-4">
                                <strong>Itens Consumidos:</strong>
                                {notificacao.itens.map((item) => (
                                    <li key={item.id} className="ml-4 list-disc">
                                        {item.produto.descricao} - {item.qtdProduto}x
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleConfirmar(notificacao)}
                                className="mt-4 w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 hover:scale-105"
                            >
                                Confirmar Atendimento
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">Nenhuma notificação no momento.</p>
            )}
        </div>
    );
}

export default ViewNotificacaoPedido;
