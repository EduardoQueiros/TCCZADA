import React, { useState } from 'react';

function FiltrosRelatorio({ setStartDate, setEndDate }) {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className="flex flex-col items-center p-5">
            <div className="flex space-x-4 mb-4">
                <input
                    type="date"
                    onChange={handleStartDateChange}
                    className="border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    onChange={handleEndDateChange}
                    className="border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="border border-gray-400 rounded-lg p-3 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        Selecione uma Categoria
                    </option>
                    <option value="Categoria 1">Pedidos por mesa</option>
                </select>
            </div>
            <button
                onClick={() => {

                    // Aqui você pode adicionar a lógica de filtragem e pesquisa
                    console.log("Categoria Selecionada:", selectedCategory);
                }}
                className="bg-blue-500 text-white rounded-lg px-6 py-2 transition duration-200 ease-in-out focus:outline-none hover:bg-blue-600 shadow-lg"
            >
                Filtrar
            </button>
        </div>
    );
}

export default FiltrosRelatorio;
