import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            const response = await axios.get("http://localhost:5000/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setUser(response.data);
        } catch (error) {
            console.error("❌ Erro ao buscar usuário:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email, senha) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/login",
                { email, senha },
                { withCredentials: true }
            );

            localStorage.setItem("token", response.data.token);
            setUser(response.data);
        } catch (error) {
            console.error("⛔ Erro ao fazer login:", error);
            throw new Error("Falha no login");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
