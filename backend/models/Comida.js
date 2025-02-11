import mongoose from "mongoose";

const comidaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    categoria: { type: String, required: true },
    imagem: { type: String },
    tempoPreparo: { type: String, required: true }, 
    disponibilidade: { type: Boolean, default: true }, 
    adicionais: [
      {
        nome: { type: String },
        preco: { type: Number }
      }
    ]
  },
  { timestamps: true }
);

const Comida = mongoose.model("Comida", comidaSchema);

export default Comida;
