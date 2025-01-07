import React from "react";
import { Pie } from "react-chartjs-2";

const GraficoPizza = ({ data }) => {
  if (!data) return <p className="text-gray-700">Sem dados para exibir.</p>;

  return (
    <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Itens Mais Pedidos
      </h2>
      <Pie
        data={data}
        options={{
          plugins: { legend: { position: "bottom" } },
          responsive: true,
        }}
      />
    </div>
  );
};

export default GraficoPizza;
