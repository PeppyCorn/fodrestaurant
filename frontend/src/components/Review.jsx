import React from "react";
import ReviewCartao from "../layouts/ReviewCartao"
import img1 from "../assets/img/pic1.png"
import img2 from "../assets/img/pic2.png"
import img3 from "../assets/img/pic3.png"

const Review = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
            <h1 className=" text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">O que nossos clientes dizem?</h1>
            <div className="flex flex-col md:flex-row gap-5 mt-5">
                <ReviewCartao img={img1} name="Amanda Soares" />
                <ReviewCartao img={img2} name="Mohammed Silva" />
                <ReviewCartao img={img3} name="Caroline Alves" />
            </div>
        </div>
    )
}

export default Review;