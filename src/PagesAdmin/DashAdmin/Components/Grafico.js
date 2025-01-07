import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Grafico = ({ graficoPedidosPorMesa }) => {
  const [selectedMesa, setSelectedMesa] = useState(null);

  if (!graficoPedidosPorMesa || graficoPedidosPorMesa.length === 0) {
    return (
      <p className="text-center text-gray-600">
        Nenhum dado disponível para os gráficos.
      </p>
    );
  }

  const COLORS = ["#4F46E5", "#F43F5E", "#10B981", "#F59E0B", "#6366F1", "#E11D48"];

  const handleBarClick = (data) => {
    setSelectedMesa(data?.mesa ? data : null); // Define a mesa selecionada ou limpa
  };

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {/* Gráfico de Pizza */}
      <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg w-full md:w-[48%]">
        <h3 className="text-center font-bold text-lg mb-4">
          Total de Pedidos por Mesa
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={graficoPedidosPorMesa}
              dataKey="quantidade"
              nameKey="mesa"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#4F46E5"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {graficoPedidosPorMesa.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Barras */}
      <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg w-full md:w-[48%]">
        <h3 className="text-center font-bold text-lg mb-4">
          Total de Produtos nos Pedidos por Mesa
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={graficoPedidosPorMesa}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            onClick={(e) => handleBarClick(e?.activePayload?.[0]?.payload)}
          >
            <XAxis
              dataKey="mesa"
              label={{
                value: "Mesas",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "Total de Produtos",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalProdutos" fill="#4F46E5" name="Total de Produtos" />
          </BarChart>
        </ResponsiveContainer>

        {/* Detalhes Interativos */}
        {selectedMesa && (
          <div className="mt-4 text-center text-gray-700">
            <h4 className="font-bold">Detalhes da Mesa {selectedMesa.mesa}</h4>
            <p>Total de Produtos: {selectedMesa.totalProdutos}</p>
            <p>Total de Pedidos: {selectedMesa.quantidade}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grafico;
