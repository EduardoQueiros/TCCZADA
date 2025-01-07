import React from "react";
import { Bar } from "react-chartjs-2";

const GraficoBarras = ({ data }) => {
  if (!data) return <p className="text-gray-700">Sem dados para exibir.</p>;

  return (
    <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Pedidos por Mesa
      </h2>
      <Bar
        data={data}
        options={{
          plugins: { legend: { display: false } },
          responsive: true,
        }}
      />
    </div>
  );
};

export default GraficoBarras;
