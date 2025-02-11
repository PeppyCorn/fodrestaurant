import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Buscar = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q") || "";
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        if (searchQuery) {
            axios.get("http://localhost:5000/comidas")
                .then((res) => {
                    const comidas = res.data;
                    const filtrados = comidas.filter((comida) =>
                        comida.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        comida.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        comida.descricao.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setResultados(filtrados);
                })
                .catch((err) => console.error("Erro ao buscar comidas:", err));
        }
    }, [searchQuery]);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Resultados para: "{searchQuery}"</h1>
            {resultados.length > 0 ? (
                <ul>
                    {resultados.map((comida) => (
                        <li key={comida.id} className="p-3 border-b">
                            <h2 className="text-lg font-semibold">{comida.nome}</h2>
                            <p className="text-sm text-gray-600">{comida.descricao}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum resultado encontrado.</p>
            )}
        </div>
    );
};

export default Buscar;
