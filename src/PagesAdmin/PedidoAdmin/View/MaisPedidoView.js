import React, { useState, useEffect } from "react";
import BotaoDashPedidos from "../Components/BotaoDashPedido";
import MaisPedidoBox from "../Components/MaisPedidoBox";
import ReturnButton from "../../../Components/ReturnButton";
import MaisPedidoController from "../Controller/MaisPedidoController";

function MaisPedidoView() {
    const [totalPedidos, setTotalPedidos] = useState(0); // Estado para o total de pedidos

    const handleTotalChange = (total) => {
        setTotalPedidos(total); // Atualiza o estado com o total recebido
    };

    // Chamar o controlador para gerenciar a lógica
    const { produtosMaisVendidos, isLoading, error } = MaisPedidoController(handleTotalChange);

    useEffect(() => {
        // Atualiza os dados a cada 5 segundos
        const interval = setInterval(() => {
            MaisPedidoController(handleTotalChange);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
            {/* Cabeçalho fixo */}
            <header className="sticky top-0 z-50 bg-blue-600 shadow-lg p-4 flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                    <ReturnButton linkPage={"/admin/home"} />
                    <h1 className="font-bold text-2xl text-white text-center flex-grow">Mais Pedidos</h1>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <BotaoDashPedidos
                        name={"Pedido"}
                        linkPage={"/admin/home/pedido"}
                        className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                    />
                    <BotaoDashPedidos
                        name={"Mais Pedidos"}
                        linkPage={"#"}
                        className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                    />
                </div>
            </header>

            {/* Lista de Pedidos */}
            <section className="flex-grow px-4 py-6">
                <div className="mt-6">
                    <MaisPedidoBox
                        produtosMaisVendidos={produtosMaisVendidos}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </section>

            {/* Total de Pedidos fixo */}
            <section className="sticky bottom-0 z-50 bg-blue-600 shadow-md p-4 flex justify-center items-center">
                <div className="bg-white w-80 text-center rounded-lg h-12 flex items-center justify-center shadow-md">
                    <p className="text-lg font-semibold text-blue-700">Total de Pedidos: {totalPedidos}</p>
                </div>
            </section>
        </div>
    );
}

export default MaisPedidoView;
