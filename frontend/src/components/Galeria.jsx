import React, { useState } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import galeria1 from "../assets/img/galeria1.jpg"
import galeria2 from "../assets/img/galeria2.jpg"
import galeria3 from "../assets/img/galeria3.jpg"
import galeria4 from "../assets/img/galeria4.jpg"
import galeria5 from "../assets/img/galeria5.jpg"
import galeria6 from "../assets/img/galeria6.jpg"
import galeria7 from "../assets/img/galeria7.jpg"
import galeria8 from "../assets/img/galeria8.jpg"
import galeria9 from "../assets/img/galeria9.jpg"

const Galeria = () => {
    const imagens = [
        { src: galeria1, alt: "Imagem 1" },
        { src: galeria2, alt: "Imagem 2" },
        { src: galeria3, alt: "Imagem 3" },
        { src: galeria4, alt: "Imagem 4" },
        { src: galeria5, alt: "Imagem 5" },
        { src: galeria6, alt: "Imagem 6" },
        { src: galeria7, alt: "Imagem 7" },
        { src: galeria8, alt: "Imagem 8" },
        { src: galeria9, alt: "Imagem 9" },
    ];

    const [indiceInicial, setIndiceInicial] = useState(0);

    const proximoGrupo = () => {
        setIndiceInicial((prev) => (prev + 3) % imagens.length);
    };

    const grupoAnterior = () => {
        setIndiceInicial((prev) => (prev - 3 + imagens.length) % imagens.length);
    };

    const imagensVisiveis = imagens.slice(indiceInicial, indiceInicial + 3).length === 3
        ? imagens.slice(indiceInicial, indiceInicial + 3)
        : [
            ...imagens.slice(indiceInicial),
            ...imagens.slice(0, 3 - imagens.slice(indiceInicial).length),
        ];

    return (
        <div className="min-h-screen object-cover flex flex-col items-center py-40 ">
            <h1 className="text-3xl font-semibold mb-6">Galeria</h1>
            <div className="flex justify-between items-center w-full max-w-4xl">
                <button
                    onClick={grupoAnterior}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    <IoMdArrowRoundBack />
                </button>
                <div className="flex gap-4">
                    {imagensVisiveis.map((imagem, index) => (
                        <img
                            key={index}
                            src={imagem.src}
                            alt={imagem.alt}
                            className="w-60 h-60 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-110"
                        />
                    ))}
                </div>
                <button
                    onClick={proximoGrupo}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    <IoMdArrowRoundForward />
                </button>
            </div>
        </div>
    );
};

export default Galeria;
