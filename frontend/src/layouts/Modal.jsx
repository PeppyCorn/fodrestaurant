import { useEffect, useState } from "react";

const Modal = ({ img, title, price, description, fechar }) => {
    const [aberto, setAberto] = useState(false);

    useEffect(() => {
        setTimeout(() => setAberto(true), 50);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className={`bg-white p-6 rounded-lg shadow-lg w-96 text-center relative transform transition-all duration-300 ease-out 
                ${aberto ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                
                <button className="absolute top-2 right-2 text-red-500 text-2xl" onClick={() => {
                    setAberto(false);
                    setTimeout(fechar, 300);
                }}>×</button>

                {/* Imagem */}
                <img className="rounded-lg w-full h-48 object-cover" src={img} alt={title} />
                
                {/* Informações */}
                <h2 className="text-2xl font-bold mt-4">{title}</h2>
                <p className="text-gray-600 mt-2">{description}</p>
                <h3 className="text-lg font-semibold text-green-600 mt-4">{price}</h3>
                
                {/* Botão Fechar */}
                <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-red-600"
                    onClick={() => {
                        setAberto(false);
                        setTimeout(fechar, 300);
                    }}>
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    );
};

export default Modal;
