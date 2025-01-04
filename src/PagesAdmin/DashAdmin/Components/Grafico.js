import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Grafico = () => {
  const [data, setData] = useState({
    labels: ['Mesa 1', 'Mesa 2', 'Mesa 3'],
    datasets: [
      {
        data: [30, 40, 30], // Porcentagens iniciais
        backgroundColor: ['#4F46E5', '#F43F5E', '#10B981'], // Cores suaves
        hoverBackgroundColor: ['#4338CA', '#BE123C', '#059669'], // Cores ao passar o mouse
        borderWidth: 0, // Remover bordas
      },
    ],
  });

  const generateRandomData = () => {
    const randomValues = Array.from({ length: 3 }, () => Math.floor(Math.random() * 50) + 10);
    const total = randomValues.reduce((a, b) => a + b, 0);
    const percentageValues = randomValues.map(value => Math.round((value / total) * 100));

    setData({
      labels: ['Mesa 1', 'Mesa 2', 'Mesa 3'],
      datasets: [
        {
          data: percentageValues,
          backgroundColor: ['#4F46E5', '#F43F5E', '#10B981'],
          hoverBackgroundColor: ['#4338CA', '#BE123C', '#059669'],
          borderWidth: 0,
        },
      ],
    });
  };

  useEffect(() => {
    const interval = setInterval(generateRandomData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Relatório por Mesa</h2>
      <div className="w-48 h-48 mx-auto">
        <Pie data={data} options={{ plugins: { legend: { display: false } } }} />
      </div>
      <div className="mt-6 space-y-2">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center justify-center space-x-2">
            <span
              className="block w-3 h-3 rounded-full"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></span>
            <span className="text-gray-600 text-sm">{label}: {data.datasets[0].data[index]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grafico;
