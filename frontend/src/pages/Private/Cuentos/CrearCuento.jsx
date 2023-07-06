import { useState } from "react";
import { useSelector } from "react-redux";
import { crearCuento } from "../../../services/cuento.service";
import { useNavigate } from "react-router-dom";

const CrearCuento = () => {
    const [personaje, setPersonaje] = useState('');
    const [nombrePersonaje, setNombre] = useState('');
    const [tema, setTema] = useState('');
    const [reflexion, setReflexion] = useState('');
    const [narrador, setNarrador] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'personaje':
                setPersonaje(value);
                break;
            case 'nombre':
                setNombre(value);
                break;
            case 'tema':
                setTema(value);
                break;
            case 'reflexion':
                setReflexion(value);
                break;
            case 'narrador':
                setNarrador(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Inicia la carga

        const idUser = user.id;
        const cuento = { personaje, nombrePersonaje, tema, reflexion, idUser };

        try {
            const res = await crearCuento(cuento);
            setIsLoading(false); // Detiene la carga
            navigate(`/private/cuento/${res.id}`);
        } catch (error) {
            console.log(error);
            setIsLoading(false); // Detiene la carga en caso de error
        }
    };

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const isStepVisible = (step) => {
        return step === currentStep;
    };


    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Configura tu Cuento</h2>
            {isLoading && <p>Cargando...</p>} {/* Indicador de carga */}
            {!isLoading && (
                <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                    <label style={{ display: isStepVisible(1) ? 'block' : 'none', marginBottom: '1rem' }}>
                        1. Elige Personaje:
                        <br />
                        Un pirata, un ratón, un hada...
                        <br />
                        (0 de 30 caracteres)
                        <br />
                        <input
                            type="text"
                            name="personaje"
                            value={personaje}
                            onChange={handleInputChange}
                            maxLength={30}
                            required={isStepVisible(1)}
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                        />
                    </label>
                    <label style={{ display: isStepVisible(2) ? 'block' : 'none', marginBottom: '1rem' }}>
                        2. Dale un nombre:
                        <br />
                        Puede ser el que tú quieras, incluso el de tu hijo o hija
                        <br />
                        (0 de 15 caracteres)
                        <br />
                        <input
                            type="text"
                            name="nombre"
                            value={nombrePersonaje}
                            onChange={handleInputChange}
                            maxLength={15}
                            required={isStepVisible(2)}
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                        />
                    </label>
                    <label style={{ display: isStepVisible(3) ? 'block' : 'none', marginBottom: '1rem' }}>
                        3. Tema del cuento:
                        <br />
                        {/* Aquí continúa el código del componente "CrearCuento": */}
                        Aquí puedes detallar el tema principal del cuento. Ejemplo: Un ratón al que no le gustaba compartir su queso
                        <br />
                        (0 de 120 caracteres)
                        <br />
                        <textarea
                            name="tema"
                            value={tema}
                            onChange={handleInputChange}
                            maxLength={120}
                            required={isStepVisible(3)}
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                        />
                    </label>
                    <label style={{ display: isStepVisible(4) ? 'block' : 'none', marginBottom: '1rem' }}>
                        4. Reflexión:
                        <br />
                        (0 de 120 caracteres)
                        <br />
                        Esta parte se reserva para la reflexión que se quiere potenciar dentro de la trama.
                        <br />
                        Ejemplo: Aprender a compartir
                        <br />
                        Enseñanza a transmitir
                        <br />
                        <textarea
                            name="reflexion"
                            value={reflexion}
                            onChange={handleInputChange}
                            maxLength={120}
                            required={isStepVisible(4)}
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                        />
                    </label>
                    <label style={{ display: isStepVisible(5) ? 'block' : 'none', marginBottom: '1rem' }}>
                        Escoge un narrador:
                        <br />
                        <select
                            name="narrador"
                            value={narrador}
                            onChange={handleInputChange}
                            required={isStepVisible(5)}
                            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                        >
                            <option value="">Selecciona un narrador</option>
                            <option value="Narrador 1">Narrador 1</option>
                            <option value="Narrador 2">Narrador 2</option>
                            <option value="Narrador 3">Narrador 3</option>
                        </select>
                    </label>
                    {currentStep < 5 && (
                        <button
                            type="button"
                            onClick={handleNextStep}
                            style={{
                                backgroundColor: '#4caf50',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Siguiente
                        </button>
                    )}
                    {currentStep === 5 && (
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#4caf50',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Crear Cuento
                        </button>
                    )}
                </form>
            )}
        </div>
    );
};

export default CrearCuento;
