import React, { useState } from "react";

function EstouSatisfeitoButton() {
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalSuccess, setShowModalSuccess] = useState(false);

    // Abre o modal de confirmação
    const handleButtonClick = () => {
        setShowModalConfirm(true);
    };

    // Confirma a satisfação e abre o modal de sucesso
    const handleConfirm = () => {
        setShowModalConfirm(false);
        setShowModalSuccess(true);
    };

    // Fecha os modais
    const handleClose = () => {
        setShowModalConfirm(false);
        setShowModalSuccess(false);
    };

    return (
        <div className="flex justify-center mt-6">
            <button
                className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300"
                onClick={handleButtonClick}
            >
                Estou Satisfeito
            </button>


            {/* Modal de Confirmação */}
            {showModalConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Você está satisfeito?
                        </h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
                                onClick={handleClose}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                onClick={handleConfirm}
                            >
                                Sim
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Sucesso */}
            {showModalSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            O garçom está a caminho!
                        </h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                onClick={handleClose}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EstouSatisfeitoButton;
