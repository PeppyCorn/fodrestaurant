import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PainelAdministrativo = () => {
  const [comidas, setComidas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComidas();
  }, []);

  const fetchComidas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/comidas");
      setComidas(response.data);
    } catch (error) {
      console.error("Erro ao buscar comidas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta comida?")) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:5000/comidas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchComidas();
      } catch (error) {
        console.error("❌ Erro ao deletar comida:", error.response ? error.response.data : error);
        alert("Erro ao deletar comida. Verifique a autenticação.");
      }
    }
  };

  return (
    <div className="min-h-screen container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Painel Administrativo</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate("/admin/adicionar")}
      >
        Adicionar Nova Comida
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comidas.map((comida) => (
          <div key={comida._id} className="border p-4 rounded-lg shadow">
            <img
              src={`http://localhost:5000/uploads/${comida.imagem}`}
              alt={comida.nome}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="font-bold text-lg mt-2">{comida.nome}</h3>
            <p>{comida.descricao}</p>
            <p className="text-green-600 font-semibold">R$ {comida.preco}</p>
            <p className="text-gray-500">⏳ {comida.tempoPreparo}</p>
            
            <p className={comida.disponibilidade ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
              {comida.disponibilidade ? "✅ Disponível" : "❌ Indisponível"}
            </p>

            {comida.adicionais.length > 0 && (
              <div>
                <h4 className="font-semibold mt-2">Adicionais:</h4>
                <ul>
                  {comida.adicionais.map((extra, index) => (
                    <li key={index} className="text-sm">🛠 {extra.nome} - R$ {extra.preco}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => navigate(`/admin/editar/${comida._id}`)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(comida._id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PainelAdministrativo;
