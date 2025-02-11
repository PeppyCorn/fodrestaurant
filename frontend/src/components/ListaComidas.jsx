import React, { useEffect, useState } from "react";
import { getComidas } from "../api/api.js";
import BarraDeBusca from "./BarraDeBusca";

const ListaComidas = () => {
  const [comidas, setComidas] = useState([]);
  const [comidasFiltradas, setComidasFiltradas] = useState(comidas);

  useEffect(() => {
    const fetchComidas = async () => {
      try {
        const data = await getComidas();
        setComidas(data);
      } catch (error) {
        console.error("Erro ao buscar comidas:", error);
      }
    };
    fetchComidas();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <BarraDeBusca comidas={comidas} onBuscar={setComidasFiltradas} />
      <ul>
        {comidasFiltradas.map((comida) => (
          <li key={comida.id} className="p-2 border-b">{comida.nome} - {comida.categoria}</li>
        ))}
      </ul>
      <h1 className="text-2xl font-bold mb-4">Cardápio</h1>
      <ul>
        {comidas.map((comida) => (
          <li key={comida._id} className="border p-4 mb-4 rounded-lg shadow hover:bg-gray-50">
            {comida.imagem && (
              <img
                src={comida.imagem}
                alt={comida.nome}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <h2 className="text-xl font-semibold">{comida.nome}</h2>
            <p className="text-gray-600">{comida.descricao}</p>
            <p className="text-green-600 font-bold">R$ {comida.preco}</p>
            <p className="text-sm text-gray-500">Categoria: {comida.categoria}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaComidas;
