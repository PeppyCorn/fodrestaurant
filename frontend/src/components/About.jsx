import React from "react";
import img from '../assets/img/about.png'
import Button from "../layouts/Button"

const About = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5">
            <img src={img} alt="img" />
            <div className="space-y-4 lg:pt-14">
                <h1 className="font-semibold text-4xl text-center md:text-start">Sobre nós</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nam officia reprehenderit repellat! Facere hic cum voluptatum 
                    ratione optio porro illum!
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, ipsum. 
                </p>
                <div className="flex justify-center lg:justify-start">
                    <Button title="Saiba Mais"/>
                </div>
            </div>
        </div>
    )
}

export default About