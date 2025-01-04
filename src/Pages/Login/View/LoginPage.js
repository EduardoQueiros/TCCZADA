import React from 'react';
import LoginController from "../Controller/LoginController";

function LoginPage() {
    const { loginData, handleInputChange, handleLogin } = LoginController();

    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center space-y-10">
            {/* Logotipo */}
            <section className="p-4">
                <img src={loginData.logotipo} alt="Logotipo do Cliente" />
            </section>

            {/* Formulário de Login */}
            <section className="flex flex-col items-center space-y-4">
                <input
                    type="text"
                    name="mesa"
                    placeholder="Mesa"
                    value={loginData.mesa}
                    onChange={handleInputChange}
                    className="text-center border border-gray-950 rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="nomeCliente"
                    placeholder="Nome"
                    value={loginData.nomeCliente}
                    onChange={handleInputChange}
                    className="text-center border border-gray-950 rounded-lg p-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </section>

            {/* Botão de Login */}
            <section>
                <button
                    onClick={handleLogin}
                    className="bg-slate-500 bg-opacity-90 p-2 w-40 rounded-lg text-center text-white"
                >
                    Login
                </button>
            </section>
        </div>
    );
}

export default LoginPage;
