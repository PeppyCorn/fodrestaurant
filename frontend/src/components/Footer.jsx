import React from 'react'

const Footer = () => {
    return (
        <div className='bg-black text-white rounded-t-3xl mt-8 md:mt-0'>
            <div className='flex flex-col md:flex-row justify-between p-8 md:px-32 px-5 '>
                <div className='w-full md:w-1/4'>
                    <h1 className='font-semibold text-xl pb-4'>Fod Restaurant</h1>
                    <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit cumque, eius quam quidem et voluptatum.</p>
                </div>
                <div>
                    <h1 className='font-medium text-xl pb-4 md:pt-0'>Links</h1>
                    <nav className='flex flex-col gap-2'>
                        <a className="hover:text-red-500 transition-all cursor-pointer" href='/'>Cardápio</a>
                        <a className="hover:text-red-500 transition-all cursor-pointer" href='/'>Sobre Nós</a>
                        <a className="hover:text-red-500 transition-all cursor-pointer" href='/'>Opção 3</a>
                        <a className="hover:text-red-500 transition-all cursor-pointer" href='/'>Opção 4</a>
                    </nav>
                </div>
                <div>
                    <h1 className='font-medium text-xl pb-4 md:pt-0'>Menu</h1>
                    <nav className='flex flex-col gap-2'>
                        <a className="hover:text-red-500 transition-all cursor-pointer" href='/'>O que servimos?</a>
                        <a className="hover:text-red-500 transition-all cursor-pointer" href='/'>Opções Extras</a>
                    </nav>
                </div>
                <div>
                    <h1 className='font-medium text-xl pb-4 md:pt-0'>Entre em Contato</h1>
                    <nav className='flex flex-col gap-2'>
                        <a className="hover:text-red-500 transition-all cursor-pointer" href='/'>fodrestaurant@gmail.com</a>
                        <a className="hover:text-red-500 transition-all cursor-pointer" href='/'>+55 (11) 9 9999-9999</a>
                        <a className="hover:text-red-500 transition-all cursor-pointer" href='/'>Nossas Redes Sociais</a>
                    </nav>
                </div>
            </div>
            <div>
                <p className='text-center py-4'>
                    @copyright desenvolvido por
                    <span className='text-red-500'> Pedro Costa Nunes </span> 
                     Todos os direitos reservados
                </p>
            </div>
        </div>
    )
}

export default Footer