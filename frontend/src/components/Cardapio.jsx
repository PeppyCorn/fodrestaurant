// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartaoCardapio from "../layouts/CartaoCardapio";
import axios from "axios";

const Cardapio = () => {
    const [categoriaAtiva, setCategoriaAtiva] = useState("Pizzas");
    const [comidas, setComidas] = useState({ Pizzas: [], Lanches: [], Pratos: [], Bebidas: [] });

    useEffect(() => {
        const fetchComidas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/comidas");
                const dados = response.data;
                
                const categorias = {
                    Pizzas: dados.filter(item => item.categoria === "Pizzas").slice(-3),
                    Lanches: dados.filter(item => item.categoria === "Lanches").slice(-3),
                    Pratos: dados.filter(item => item.categoria === "Pratos").slice(-3),
                    Bebidas: dados.filter(item => item.categoria === "Bebidas").slice(-3),
                };
                
                setComidas(categorias);
            } catch (error) {
                console.error("Erro ao buscar comidas:", error);
            }
        };

        fetchComidas();
    }, []);

    return (
        <div className="min-h-screen flex flex-col lg:px-32 px-5 py-20">
            <h1 className="text-4xl font-semibold text-center mb-10">O que oferecemos?</h1>
            <div className="flex justify-center gap-4 mb-10">
                {Object.keys(comidas).map((categoria) => (
                    <button
                        key={categoria}
                        onClick={() => setCategoriaAtiva(categoria)}
                        className={`px-4 py-2 rounded-lg text-lg font-medium ${
                            categoriaAtiva === categoria
                                ? "bg-red-500 text-white"
                                : "bg-gray-200 text-gray-800"
                        } hover:bg-red-400 transition-all`}
                    >
                        {categoria}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-8 justify-center">
                {comidas[categoriaAtiva].map((item, index) => (
                    <CartaoCardapio
                        key={index}
                        img={`http://localhost:5000/uploads/${item.imagem}`}
                        title={item.nome}
                        price={`R$ ${item.preco}`}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <Link
                    to="/cardapio"
                    className="px-6 py-3 rounded-lg bg-red-500 text-white text-lg font-medium hover:bg-red-600 transition-all"
                >
                    Ver mais
                </Link>
            </div>
        </div>
    );
};

export default Cardapio;
