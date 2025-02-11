import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/signup", { nome, email, senha });
      alert("Cadastro realizado!");
      navigate("/login");
    } catch (error) {
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-8 rounded-lg w-full max-w-mdflex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-6">Cadastro</h1>
        <input type="text" className="mb-4" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};

export default Register;
