import { useState } from "react";
import Modal from "./Modal.jsx";

const CartaoCardapio = ({ img, title, price, description }) => {
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <>
            <div 
                className="w-full lg:w-1/4 p-5 shadow-lg rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between"
                onClick={() => setModalAberto(true)}
            >
                <img className="rounded-xl w-full h-48 object-cover" src={img} alt="img" />
                <div className="space-y-4 text-center flex flex-col flex-grow justify-between">
                    <h3 className="font-semibold text-xl pt-4">{title}</h3>
                    <div className="flex flex-row items-center justify-center gap-4 pb-4">
                        <h3 className="font-semibold text-lg">{price}</h3>
                    </div>
                </div>
            </div>

            {modalAberto && <Modal img={img} title={title} price={price} description={description} fechar={() => setModalAberto(false)} />}
        </>
    );
};

export default CartaoCardapio;
