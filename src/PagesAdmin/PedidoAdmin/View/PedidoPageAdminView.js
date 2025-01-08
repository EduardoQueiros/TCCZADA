import React, { useState, useEffect } from "react";
import PedidoPageAdminController from "../Controller/PedidoPageAdminController";
import PedidoBox from "../Components/PedidoBox";
import ReturnButton from "../../../Components/ReturnButton";
import BotaoDashPedidos from "../Components/BotaoDashPedido";
import Search from "../../../Components/Search";

function PedidoPageAdminView() {
    const [searchTerm, setSearchTerm] = useState("");
    const { pedidos, loading, error, refreshPedidos } = PedidoPageAdminController(searchTerm);

    useEffect(() => {
        // Atualiza os pedidos a cada 5 segundos
        const interval = setInterval(() => {
            refreshPedidos();
        }, 5000);

        return () => clearInterval(interval);
    }, [refreshPedidos]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
            {/* Cabeçalho fixo */}
            <header className="sticky top-0 z-50 bg-blue-600 shadow-lg p-4 flex flex-col items-center">
                <div className="flex items-center justify-between w-full">
                    <ReturnButton linkPage={"/admin/home"} />
                    <h1 className="font-bold text-2xl text-white text-center flex-grow">Pedidos</h1>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <BotaoDashPedidos
                        name={"Pedido"}
                        linkPage={"#"}
                        className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                    />
                    <BotaoDashPedidos
                        name={"Mais Pedidos"}
                        linkPage={"/admin/home/pedido/maispedido"}
                        className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                    />
                </div>
            </header>

            {/* Barra de Pesquisa fixa */}
            <section className="sticky top-[112px] z-40 bg-blue-50 py-4 px-4 shadow-md">
                <Search
                    nome={"Pesquise pedidos"}
                    onSearch={handleSearch}
                    className="w-full max-w-lg mx-auto"
                />
            </section>

            {/* Lista de Pedidos */}
            <section className="flex-grow px-4 py-6">
                {loading && <p className="text-center text-gray-700">Carregando pedidos...</p>}
                {error && <p className="text-center text-red-500">Erro ao carregar pedidos.</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pedidos.map((pedido) => (
                        <PedidoBox
                            key={pedido.id}
                            mesa={pedido.mesa}
                            cliente={pedido.cliente}
                            produtos={pedido.produtos}
                            adicionais={pedido.adicionais}
                        />
                    ))}
                </div>
            </section>

            {/* Rodapé fixo */}
            <footer className="bg-blue-600 text-white py-4 text-center shadow-md">
                <p>© 2024 - Sistema de Gerenciamento de Pedidos</p>
            </footer>
        </div>
    );
}

export default PedidoPageAdminView;
