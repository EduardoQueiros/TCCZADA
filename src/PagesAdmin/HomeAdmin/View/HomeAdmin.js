import React, { useState } from "react";
import ViewNotificacaoPedido from "./ViewNotificacaoPedido";
import Box from "../ComponentsHomeAdmin/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFileInvoice, faBox, faTag, faChartPie, faChair, faUtensils } from "@fortawesome/free-solid-svg-icons";

function HomeAdmin() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col items-center">
            {/* Cabeçalho */}
            <header className="w-full py-6 bg-blue-600 text-white shadow-lg flex justify-between items-center px-6 text-center">
                <h1 className="text-4xl font-bold">Painel Administrativo</h1>
                <button
                    className="bg-white text-blue-600 p-4 rounded-full shadow-md hover:bg-blue-100 hover:scale-105 transition-transform duration-300"
                    onClick={() => setShowModal(true)}
                >
                    <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
                </button>
            </header>

            {/* Modal de Notificações */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
                    <div className="bg-white rounded-lg shadow-lg w-3/4 p-6 transform transition-transform duration-300 scale-95">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Notificações</h2>
                            <button
                                className="text-red-500 font-bold hover:scale-110 transition-transform"
                                onClick={() => setShowModal(false)}
                            >
                                Fechar
                            </button>
                        </div>
                        <ViewNotificacaoPedido />
                    </div>
                </div>
            )}

            {/* Seção Principal */}
            <main className="flex-grow w-full max-w-7xl p-6">
                <h2 className="text-2xl font-semibold text-blue-700 text-center mb-8">
                    Gerencie todas as operações do sistema
                </h2>
                <div className="grid grid-rows-2 grid-cols-3 gap-8">
                    <Box
                        image={<FontAwesomeIcon icon={faUtensils} className="w-12 h-12 text-blue-600" />}
                        name={"Pedidos"}
                        linkPage={"/admin/home/pedido"}
                        iconName={"pedidoIcon"}
                    />
                    <Box
                        image={<FontAwesomeIcon icon={faFileInvoice} className="w-12 h-12 text-blue-600" />}
                        name={"Relatórios"}
                        linkPage={"/admin/home/relatorio"}
                        iconName={"relatorioIcon"}
                    />
                    <Box
                        image={<FontAwesomeIcon icon={faBox} className="w-12 h-12 text-blue-600" />}
                        name={"Produtos"}
                        linkPage={"/admin/home/produto"}
                        iconName={"produtoIcon"}
                    />
                    <Box
                        image={<FontAwesomeIcon icon={faTag} className="w-12 h-12 text-blue-600" />}
                        name={"Categoria"}
                        linkPage={"/admin/home/categoria"}
                        iconName={"categoriaIcon"}
                    />
                    <Box
                        image={<FontAwesomeIcon icon={faChartPie} className="w-12 h-12 text-blue-600" />}
                        name={"Dashboard"}
                        linkPage={"/admin/home/dashboard"}
                        iconName={"dashIcon"}
                    />
                    <Box
                        image={<FontAwesomeIcon icon={faChair} className="w-12 h-12 text-blue-600" />}
                        name={"Mesas"}
                        linkPage={"/admin/home/mesa"}
                        iconName={"mesaIcon"}
                    />
                </div>
            </main>

            {/* Rodapé */}
            <footer className="w-full py-4 bg-blue-600 text-center text-white text-sm shadow-md">
                © 2024 - Sistema Administrativo
            </footer>
        </div>
    );
}

export default HomeAdmin;
