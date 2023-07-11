import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";

const BuyingPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (id === "1") {
            setTitle("CuentaCuentos");
        } else if (id === "2") {
            setTitle("Educador");
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
                        </div>
                        <div className="flex">
                            <Link
                                to="/"
                                className="text-gray-800 hover:text-gray-600 px-4 py-2"
                            >
                                Inicio
                            </Link>
                            <Link
                                to="/register"
                                className="text-gray-800 hover:text-gray-600 px-4 py-2"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="text-gray-800 hover:text-gray-600 px-4 py-2"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-4xl font-bold mb-8">Realizar Pago: {title}</h1>
                <div className="max-w-lg bg-white p-8 rounded shadow">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                                Número de tarjeta
                            </label>
                            <div className="flex items-center border rounded py-2 px-3 shadow-sm">
                                <FaCreditCard className="text-gray-400 mr-2" />
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                                    id="cardNumber"
                                    type="text"
                                    pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                                    inputMode="numeric"
                                    title="Ingrese un número de tarjeta válido"
                                    placeholder="0000 0000 0000 0000"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expirationDate">
                                Fecha de vencimiento
                            </label>
                            <div className="flex items-center border rounded py-2 px-3 shadow-sm">
                                <FaCalendarAlt className="text-gray-400 mr-2" />
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                                    id="expirationDate"
                                    type="tel"
                                    pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                                    inputMode="numeric"
                                    title="Ingrese una fecha de vencimiento válida (MM/AA)"
                                    placeholder="MM/AA"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                                CVV
                            </label>
                            <div className="flex items-center border rounded py-2 px-3 shadow-sm">
                                <FaLock className="text-gray-400 mr-2" />
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                                    id="cvv"
                                    type="text"
                                    pattern="[0-9]{3}"
                                    inputMode="numeric"
                                    title="Ingrese un CVV válido (3 dígitos)"
                                    placeholder="123"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardHolderName">
                                Nombre del titular
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cardHolderName"
                                type="text"
                                placeholder="Nombre y Apellido"
                                required
                            />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Pagar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BuyingPage;
