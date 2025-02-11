import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // é a URL do backend
});

export const getComidas = async () => {
  try {
    const response = await api.get("/comidas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar comidas:", error);
    throw error;
  }
};

export const updateComida = async (id, comidaAtualizada) => {
  try {
    const response = await api.put(`/comidas/${id}`, comidaAtualizada);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar comida:", error);
    throw error;
  } 
}

export const addComida = async (novaComida) => {
  return await api.post("/comidas", novaComida);
};


export default api;
