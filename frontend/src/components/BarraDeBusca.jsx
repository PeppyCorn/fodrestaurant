import React, { useState, useEffect } from "react";

const BarraDeBusca = ({ comidas, onBuscar }) => {
  const [termo, setTermo] = useState("");
  const [buscasRecentes, setBuscasRecentes] = useState([]);

  useEffect(() => {
    const buscasSalvas = JSON.parse(localStorage.getItem("buscasRecentes")) || [];
    setBuscasRecentes(buscasSalvas);
  }, []);

  const handleChange = (e) => {
    setTermo(e.target.value);
  };

  const handleBuscar = () => {
    if (!termo.trim()) return;

    const novasBuscas = [termo, ...buscasRecentes.filter((b) => b !== termo)].slice(0, 5);
    setBuscasRecentes(novasBuscas);
    localStorage.setItem("buscasRecentes", JSON.stringify(novasBuscas));

    const resultados = comidas.filter((comida) =>
      comida.nome.toLowerCase().includes(termo.toLowerCase()) ||
      comida.categoria.toLowerCase().includes(termo.toLowerCase()) ||
      comida.descricao.toLowerCase().includes(termo.toLowerCase())
    );

    onBuscar(resultados);
  };

  return (
    <div className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={termo}
          onChange={handleChange}
          placeholder="Buscar comida..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
        >
          🔍
        </button>
      </div>
      {buscasRecentes.length > 0 && (
        <div className="mt-2">
          <p className="text-gray-600 text-sm">Buscas recentes:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {buscasRecentes.map((busca, index) => (
              <button
                key={index}
                className="bg-gray-200 text-sm px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200"
                onClick={() => setTermo(busca)}
              >
                {busca}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BarraDeBusca;
