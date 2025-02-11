import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaMotorcycle } from "react-icons/fa";
import Button from "../layouts/Button";

const Localizacao = () => {
    return (
        <div className=" bg-gray-800 text-white rounded-3xl py-10 px-5 lg:px-32 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mb-10">Onde nos localizamos?</h1>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20">
                <div className="space-y-5 text-lg">
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-red-500" size={20} />
                        <p className="text-white">Rua Exemplo, 123, Bairro Central, Cidade XYZ</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaPhoneAlt className="text-red-500" size={20} />
                        <p className="text-white">(11) 99999-9999</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaClock className="text-red-500" size={20} />
                        <p className="text-white">Segunda a Domingo: 10h às 22h</p>
                    </div>
                    <div className="flex items-center gap-3 ">
                        <FaMotorcycle className="text-red-500" size={20} />
                        <p className="text-white">Fazemos entregas</p>
                    </div>
                    <div className="flex items-center gap-3 ">
                        <Button title="Faça seu Pedido" />
                    </div>
                </div>
                <div className="w-full lg:w-2/3">
                    <iframe
                        className="w-full h-72 lg:h-96 rounded-lg shadow-lg"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d958.4958958754178!2d-57.68385674633409!3d-16.066341665721495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1736966347107!5m2!1spt-BR!2sbr"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa do Restaurante"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Localizacao;
