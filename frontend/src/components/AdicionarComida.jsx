import React, { useState } from "react";
import axios from "axios";

const AdicionarComida = () => {
  const [comida, setComida] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    tempoPreparo: "",
    disponibilidade: true,
    adicionais: [],
    novoAdicional: "",
    precoAdicional: "",
    imagem: null,
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (name === "imagem") {
      setComida({ ...comida, imagem: files[0] });
    } else if (type === "checkbox") {
      setComida({ ...comida, [name]: checked });
    } else {
      setComida({ ...comida, [name]: value });
    }
  };  

  const handleAddAdicional = () => {
    if (comida.novoAdicional.trim() !== "" && comida.precoAdicional.trim() !== "") {
      setComida((prevState) => ({
        ...prevState,
        adicionais: [
          ...prevState.adicionais,
          { nome: prevState.novoAdicional.trim(), preco: parseFloat(prevState.precoAdicional) },
        ],
        novoAdicional: "",
        precoAdicional: "",
      }));
    } else {
      alert("Preencha o nome e o preço do adicional.");
    }
  };
  
  const handleRemoveAdicional = (index) => {
    setComida((prevState) => ({
      ...prevState,
      adicionais: prevState.adicionais.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!comida.nome || !comida.descricao || !comida.preco || !comida.categoria || !comida.tempoPreparo || !comida.imagem) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }
  
    const formData = new FormData();
    formData.append("nome", comida.nome);
    formData.append("descricao", comida.descricao);
    formData.append("preco", comida.preco);
    formData.append("categoria", comida.categoria);
    formData.append("tempoPreparo", comida.tempoPreparo);
    formData.append("disponibilidade", comida.disponibilidade ? "true" : "false");
    formData.append("adicionais", JSON.stringify(comida.adicionais));
    formData.append("imagem", comida.imagem);
  
    try {
      const response = await axios.post("http://localhost:5000/comidas", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert("Comida adicionada com sucesso!");
  
      setComida({
        nome: "",
        descricao: "",
        preco: "",
        categoria: "",
        tempoPreparo: "",
        disponibilidade: true,
        adicionais: [],
        novoAdicional: "",
        precoAdicional: "",
        imagem: null,
      });
    } catch (error) {
      console.error("Erro ao adicionar comida:", error);
      alert("Erro ao adicionar comida.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Adicionar Comida</h1>

        <div className="mb-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome da comida"
            value={comida.nome}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={comida.descricao}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="preco"
            placeholder="Preço"
            value={comida.preco}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <select
            name="categoria"
            value={comida.categoria}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" disabled>Selecione a categoria</option>
            <option value="Pizzas">Pizzas</option>
            <option value="Lanches">Lanches</option>
            <option value="Pratos">Pratos</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="tempoPreparo"
            placeholder="Tempo de preparo (ex: 30 min)"
            value={comida.tempoPreparo || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="disponibilidade"
            checked={comida.disponibilidade}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Disponível</label>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Adicionais:</label>
          <div className="flex">
            <input
              type="text"
              name="novoAdicional"
              placeholder="Nome do adicional"
              value={comida.novoAdicional}
              onChange={handleChange}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="number"
              name="precoAdicional"
              placeholder="Preço"
              value={comida.precoAdicional}
              onChange={handleChange}
              className="w-24 px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddAdicional}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
            >
              +
            </button>
          </div>
          <ul className="mt-2">
            {comida.adicionais.map((adicional, index) => (
              <li key={index} className="flex justify-between bg-gray-200 px-3 py-1 rounded-lg mt-2">
                {adicional.nome} - R$ {adicional.preco.toFixed(2)}
                <button onClick={() => handleRemoveAdicional(index)} className="text-red-500 ml-2">✖</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <input
            type="file"
            name="imagem"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Adicionar Comida
        </button>
      </form>
    </div>
  );
};

export default AdicionarComida;
