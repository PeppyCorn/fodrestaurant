import React, { useEffect, useState } from "react";
import { getComidas } from "../api/api";
import Button from "../layouts/Button";

const CardapioCompleto = () => {
  const [comidas, setComidas] = useState([]);
  const [comidasPorCategoria, setComidasPorCategoria] = useState({});
  const [loading, setLoading] = useState(true);

  const ordemCategorias = ["Pizzas", "Lanches", "Pratos", "Bebidas"];

  useEffect(() => {
    const fetchComidas = async () => {
      try {
        const data = await getComidas();
        setComidas(data);
        const agrupadas = agruparPorCategoria(data);
        setComidasPorCategoria(agrupadas);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar comidas:", error);
        setLoading(false);
      }
    };
    fetchComidas();
  }, []);

  const agruparPorCategoria = (comidas) => {
    return comidas.reduce((acc, comida) => {
      const categoria = comida.categoria;
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(comida);
      return acc;
    }, {});
  };

  return (
    <div className="min-h-screen container mx-auto p-4 pb-16 pt-20">
      <h1 className="text-4xl font-bold mb-4 p-5 text-center">Cardápio</h1>
      {loading ? (
        <p className="text-center text-gray-500">Carregando...</p>
      ) : ordemCategorias.some((categoria) => comidasPorCategoria[categoria]) ? (
        ordemCategorias.map(
          (categoria) =>
            comidasPorCategoria[categoria] && (
              <div key={categoria} className="mb-10 text-center">
                <h2 className="text-xl font-bold mb-4">{categoria}</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {comidasPorCategoria[categoria].map((comida) => (
                    <div
                      key={comida._id}
                      className="w-64 border p-4 rounded-lg shadow bg-white flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-md"
                    >
                      <img
                        src={`http://localhost:5000/uploads/${comida.imagem}`}
                        alt={comida.nome}
                        className="rounded-xl w-full h-40 object-cover"
                      />
                      <div className="space-y-4">
                        <h3 className="font-semibold text-center text-xl pt-6">{comida.nome}</h3>
                        <div className="flex flex-row items-center justify-center gap-4">
                          <h3 className="font-semibold text-lg">R$ {comida.preco}</h3>
                          <Button title="Comprar" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        )
      ) : (
        <p className="text-center text-gray-500">Nenhuma comida encontrada.</p>
      )}
    </div>

  );
};

export default CardapioCompleto;
