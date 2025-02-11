import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarComida = () => {
  const { comidaId } = useParams();
  const navigate = useNavigate();
  const [comida, setComida] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    tempoPreparo: "",
    disponibilidade: false,
    adicionais: "",
    imagem: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchComida = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comidas/${comidaId}`);
        const data = response.data;
        setComida({
          ...data,
          disponibilidade: data.disponibilidade ? "true" : "false",
          adicionais: data.adicionais ? JSON.stringify(data.adicionais) : "",
        });
      } catch (error) {
        console.error("Erro ao buscar comida:", error);
        alert("Erro ao carregar os dados da comida.");
      } finally {
        setLoading(false);
      }
    };

    fetchComida();
  }, [comidaId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagem") {
      setComida({ ...comida, imagem: files[0] });
    } else {
      setComida({ ...comida, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let formData = new FormData();
      formData.append("nome", comida.nome);
      formData.append("descricao", comida.descricao);
      formData.append("preco", comida.preco);
      formData.append("categoria", comida.categoria);
      formData.append("tempoPreparo", comida.tempoPreparo);
      formData.append("disponibilidade", comida.disponibilidade);
      formData.append("adicionais", comida.adicionais);

      if (comida.imagem instanceof File) {
        formData.append("imagem", comida.imagem);
      }

      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:5000/comidas/${comidaId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Comida editada com sucesso!");
      navigate("/admin");
    } catch (error) {
      console.error("❌ Erro ao editar comida:", error.response ? error.response.data : error);
      alert("Erro ao editar comida. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Editar Comida</h1>
        <input type="text" name="nome" value={comida.nome} onChange={handleChange} placeholder="Nome" className="w-full p-2 mb-2 border rounded" />
        <textarea name="descricao" value={comida.descricao} onChange={handleChange} placeholder="Descrição" className="w-full p-2 mb-2 border rounded" />
        <input type="number" name="preco" value={comida.preco} onChange={handleChange} placeholder="Preço" className="w-full p-2 mb-2 border rounded" />
        <select name="categoria" value={comida.categoria} onChange={handleChange} className="w-full p-2 mb-2 border rounded">
          <option value="">Selecione uma categoria</option>
          <option value="Pizzas">Pizzas</option>
          <option value="Lanches">Lanches</option>
          <option value="Pratos">Pratos</option>
          <option value="Bebidas">Bebidas</option>
        </select>
        <input type="text" name="tempoPreparo" value={comida.tempoPreparo} onChange={handleChange} placeholder="Tempo de Preparo" className="w-full p-2 mb-2 border rounded" />
        <select name="disponibilidade" value={comida.disponibilidade} onChange={handleChange} className="w-full p-2 mb-2 border rounded">
          <option value="true">Disponível</option>
          <option value="false">Indisponível</option>
        </select>
        <input type="text" name="adicionais" value={comida.adicionais} onChange={handleChange} placeholder='["Extra queijo", "Borda recheada"]' className="w-full p-2 mb-2 border rounded" />
        <input type="file" name="imagem" accept="image/*" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">{saving ? "Salvando..." : "Salvar Alterações"}</button>
      </form>
    </div>
  );
};

export default EditarComida;
