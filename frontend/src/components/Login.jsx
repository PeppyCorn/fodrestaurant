import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background from "../assets/img/LoginBG.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                email,
                senha: password,
            }, { withCredentials: true });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            } else {
                console.error("❌ Erro: Token não recebido do backend!");
            }
    
            if (response.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("❌ Erro ao fazer login:", error);
        }
    };
             
      
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Bem-vindo de volta!</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Entrar
                    </button>
                    <p className="text-center text-gray-600 mt-4">
                        Não tem uma conta?{" "}
                        <a href="/signup" className="text-blue-500 hover:underline">
                            Cadastre-se
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
