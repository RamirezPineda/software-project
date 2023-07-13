import React from 'react';
import Libro from '../../assets/Libro.png'
import Mago from '../../assets/mago.png'
import Castillo from '../../assets/castillo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUpdateRol } from '../../hooks/userUsers.hook';
import { PrivateRoutes } from "../../constants/routes";

export const Cards = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const { updateRol } = useUpdateRol(user.id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const id = user.id;
        const rol = "CuentaCuentos";
        try {
            const response = await updateRol({ rol });
            console.log(response);
            if (response?.id) {                
                console.log("se cambio el rol");
                navigate(PrivateRoutes.PRIVATE, { replace: true });                        
                setMessageError("");                
            } else if (response && "message" in response) {
                setMessageError(response.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='w-full py-[5rem] px-4 bg-white'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Libro} alt="/" />
                    <h2 className='text-2xl font-bold text-center py-8'>CuentaCuentos</h2>
                    <p className='text-center text-4xl font-bold'>$0</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b mx-8 mt-8'>Genera Cuentos</p>
                        <p className='py-2 border-b mx-8'>Genera Moralejas</p>
                        <p className='py-2 border-b mx-8'>30 peticiones gratis</p>
                    </div>
                    <button className='text-center bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3' onClick={handleSubmit}>Start Trial</button>
                </div>
                <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={Mago} alt="/" />
                    <h2 className='text-2xl font-bold text-center py-8'>Narrador</h2>
                    <p className='text-center text-4xl font-bold'>$30</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b mx-8 mt-8'>Genera Imagenes Relacionadas</p>
                        <p className='py-2 border-b mx-8'>Narrador De Cuentos</p>
                        <p className='py-2 border-b mx-8'>Peticiones Ilimitadas</p>
                    </div>
                    <Link to='/private/buying/1' className='text-center bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</Link>
                </div>
                <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                    <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Castillo} alt="/" />
                    <h2 className='text-2xl font-bold text-center py-8'>Políglota</h2>
                    <p className='text-center text-4xl font-bold'>$15</p>
                    <div className='text-center font-medium'>
                        <p className='py-2 border-b mx-8 mt-8'>Genera Imagenes Relacionadas</p>
                        <p className='py-2 border-b mx-8'>Peticiones en cualquier Idioma</p>
                        <p className='py-2 border-b mx-8'>100 peticiones</p>
                    </div>
                    <Link to='/private/buying/2' className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</Link>
                </div>
            </div>
        </div>
    );
};

