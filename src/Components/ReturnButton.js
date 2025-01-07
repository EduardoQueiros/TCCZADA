import React from "react";

function ReturnButton({ linkPage }) {
  return (
    <div className="flex items-center justify-center">
      <a href={linkPage}>
        <button
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition duration-200"
          aria-label="Voltar"
        >
          <img
            src="https://img.icons8.com/?size=100&id=89208&format=png&color=000000"
            alt="returnIcon"
            className="w-6 h-6"
          />
        </button>
      </a>
    </div>
  );
}

export default ReturnButton;
