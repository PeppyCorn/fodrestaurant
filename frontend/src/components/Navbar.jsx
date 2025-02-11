import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Button from "../layouts/Button";
import { BiLogoAirbnb } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { PiHamburgerDuotone } from "react-icons/pi";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState(""); 
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (searchQuery.trim() !== "") {
                navigate(`/buscar?q=${searchQuery}`);
            }
        }
    };

    return (
        <div className="fixed w-full bg-white shadow-[0_3px_3px_rgba(0,0,0,0.2)] z-50">
            <div>
                <div className="flex flex-row justify-between items-center p-5 md:px-32 px-5 bg-white shadow-[0_3px_3px_rgba(0,0,0,0.2)]">

                    <RouterLink to="/" className="flex flex-row items-center cursor-pointer">
                        <PiHamburgerDuotone size={32} />
                        <h1 className="text-xl font-semibold ml-2">Fod Restaurant</h1>
                    </RouterLink>

                    <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-5">
                        <RouterLink to="/" className="hover:text-slate-600 transition-all cursor-pointer">Home</RouterLink>
                        <ScrollLink to="cardapio" className="hover:text-slate-600 transition-all cursor-pointer">Cardápio</ScrollLink>
                        <ScrollLink to="about" className="hover:text-slate-600 transition-all cursor-pointer">Sobre Nós</ScrollLink>
                        <ScrollLink to="contato" className="hover:text-slate-600 transition-all cursor-pointer">Contato</ScrollLink>

                        {/* Barra de busca */}
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchSubmit}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-3 text-gray-500" size={20} />
                        </div>
                    </nav>

                    <div >
                        <RouterLink to="/login" className="flex flex-row items-center cursor-pointer">
                            <Button title="Login"/>
                        </RouterLink>
                    </div>
                
                </div>
            </div>
        </div>
    );
};

export default Navbar;
