import React from "react";

function FiltroSelect({ value, onChange, opcoes }) {
  return (
    <div className="relative w-full max-w-xs">
      {/* Ícone (filtro) à esquerda */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.382a1 1 0 01-.293.707l-5.414 5.414A1
             1 0 0014 13.586V18l-4 2v-6.414a1 1 0 00-.293-.707L4.293 7.09A1 1 0
             014 6.383V4z"
          />
        </svg>
      </div>

      {/* SELECT com mesmo estilo do Search */}
      <select
        className="
          appearance-none w-full py-3 pl-10 pr-10 border border-gray-300
          rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500
          focus:outline-none focus:border-blue-500 sm:text-sm bg-white
        "
        value={value}
        onChange={onChange}
      >
        <option value="">Todos</option>
        {opcoes.map((tipo) => (
          <option key={tipo.id} value={tipo.descricao}>
            {tipo.descricao}
          </option>
        ))}
      </select>

      {/* Ícone de setinha (chevron) à direita */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10
               10.586l3.293-3.293a1 1 0 011.414
               1.414l-4 4a1 1 0 01-1.414 0l-4-4a1
               1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default FiltroSelect;
