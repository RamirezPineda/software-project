import { useState } from "react";
import { useSelector } from "react-redux";
import { crearCuento } from "../../../services/cuento.service";
import { useNavigate } from "react-router-dom";

const CrearCuento = () => {
    const [personaje, setPersonaje] = useState("");
    const [nombrePersonaje, setNombre] = useState("");
    const [tema, setTema] = useState("");
    const [reflexion, setReflexion] = useState("");
    const [narrador, setNarrador] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasEmptyFields, setHasEmptyFields] = useState(false);

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "personaje":
                setPersonaje(value);
                break;
            case "nombre":
                setNombre(value);
                break;
            case "tema":
                setTema(value);
                break;
            case "reflexion":
                setReflexion(value);
                break;
            case "narrador":
                setNarrador(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emptyFields = checkEmptyFields();
        if (emptyFields) {
            setHasEmptyFields(true);
            return;
        }

        setIsLoading(true); // Inicia la carga

        const idUser = user.id;
        const cuento = { personaje, nombrePersonaje, tema, reflexion, narrador, idUser };

        try {
            const res = await crearCuento(cuento);
            await new Promise((resolve) => setTimeout(resolve, 20000));
            setIsLoading(false); // Detiene la carga
            navigate(`/private/cuento/${res.id}`);
        } catch (error) {
            console.log(error);
            setIsLoading(false); // Detiene la carga en caso de error
        }
    };

    const handleNextStep = () => {
        const emptyFields = checkEmptyFields();
        if (emptyFields) {
            setHasEmptyFields(true);
        } else {
            setCurrentStep((prevStep) => prevStep + 1);
            setHasEmptyFields(false);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const checkEmptyFields = () => {
        if (isStepVisible(1) && personaje === "") {
            return true;
        }
        if (isStepVisible(2) && nombrePersonaje === "") {
            return true;
        }
        if (isStepVisible(3) && tema === "") {
            return true;
        }
        if (isStepVisible(4) && reflexion === "") {
            return true;
        }
        if (isStepVisible(5) && narrador === "") {
            return true;
        }
        return false;
    };

    const isStepVisible = (step) => {
        return step === currentStep;
    };

    return (
        <div style={{ fontFamily: "Belgrano, serif", maxWidth: "600px", margin: "0 auto" }}>
            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "1rem",
                    color: "#2f3136",
                    fontSize: "28px",
                    fontWeight: "600",
                }}
            >
                Configura tu Cuento
            </h2>
            {isLoading && <p style={{ textAlign: "center" }}>Cargando...</p>}
            {!isLoading && (
                <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                    {hasEmptyFields && <p style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>Por favor, completa todos los campos antes de continuar.</p>}
                    <label style={{ display: isStepVisible(1) ? "block" : "none", marginBottom: "1rem" }}>
                        <div style={{ color: "rgba(8, 187, 182, 1)", fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem" }}>
                            1. Elige Personaje:
                        </div>
                        <div style={{ color: "#2f3136", fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>
                            Un pirata, un ratón, un hada...
                        </div>
                        <div style={{ color: "#2f3136", fontSize: "16px", fontWeight: "400", marginBottom: "0.5rem" }}>
                            (0 de 30 caracteres)
                        </div>
                        <input
                            type="text"
                            name="personaje"
                            value={personaje}
                            onChange={handleInputChange}
                            maxLength={30}
                            required={isStepVisible(1)}
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                marginBottom: "0.5rem",
                                textTransform: "capitalize",
                                accentColor: "#2f3136",
                                color: "#2f3136",
                                fontWeight: "600",
                                fontSize: "18px",
                                fontFamily: "Belgrano, serif",
                                letterSpacing: "0.5px",
                                lineHeight: "1.5",
                                border: "1px solid #e3e5e8",
                                borderRadius: "4px",
                                outline: "none",
                                transition: "border-color .2s ease-in-out",
                                backgroundColor: "#ADFFFF",
                                boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                            }}
                        />
                    </label>
                    <label style={{ display: isStepVisible(2) ? "block" : "none", marginBottom: "1rem" }}>
                        <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem", color: "rgba(8, 187, 182, 1)" }}>2. Dale un nombre:</div>
                        <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>Puede ser el que tú quieras, incluso el de tu hijo o hija</div>
                        <div style={{ fontSize: "16px", fontWeight: "400", marginBottom: "0.5rem" }}>(0 de 15 caracteres)</div>
                        <input
                            type="text"
                            name="nombre"
                            value={nombrePersonaje}
                            onChange={handleInputChange}
                            maxLength={15}
                            required={isStepVisible(2)}
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                marginBottom: "0.5rem",
                                textTransform: "capitalize",
                                accentColor: "#2f3136",
                                color: "#2f3136",
                                fontWeight: "600",
                                fontSize: "18px",
                                fontFamily: "Belgrano, serif",
                                letterSpacing: "0.5px",
                                lineHeight: "1.5",
                                border: "1px solid #e3e5e8",
                                borderRadius: "4px",
                                outline: "none",
                                transition: "border-color .2s ease-in-out",
                                backgroundColor: "#ADFFFF",
                                boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                            }}
                        />
                    </label>
                    <label style={{ display: isStepVisible(3) ? "block" : "none", marginBottom: "1rem" }}>
                        <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem", color: "rgba(8, 187, 182, 1)" }}>3. Tema del cuento:</div>
                        <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>
                            Aquí puedes detallar el tema principal del cuento. Ejemplo: Un ratón al que no le gustaba compartir su queso
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "400", marginBottom: "0.5rem" }}>(0 de 120 caracteres)</div>
                        <textarea
                            name="tema"
                            value={tema}
                            onChange={handleInputChange}
                            maxLength={120}
                            required={isStepVisible(3)}
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                marginBottom: "0.5rem",
                                textTransform: "capitalize",
                                accentColor: "#2f3136",
                                color: "#2f3136",
                                fontWeight: "600",
                                fontSize: "18px",
                                fontFamily: "Belgrano, serif",
                                letterSpacing: "0.5px",
                                lineHeight: "1.5",
                                border: "1px solid #e3e5e8",
                                borderRadius: "4px",
                                outline: "none",
                                transition: "border-color .2s ease-in-out",
                                backgroundColor: "#ADFFFF",
                                boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                            }}
                        />
                    </label>
                    <label style={{ display: isStepVisible(4) ? "block" : "none", marginBottom: "1rem" }}>
                        <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem", color: "rgba(8, 187, 182, 1)" }}>4. Reflexión:</div>
                        <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>(0 de 120 caracteres)</div>
                        <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>Esta parte se reserva para la reflexión que se quiere potenciar dentro de la trama.</div>
                        <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>Ejemplo: Aprender a compartir</div>
                        <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>Enseñanza a transmitir</div>
                        <textarea
                            name="reflexion"
                            value={reflexion}
                            onChange={handleInputChange}
                            maxLength={120}
                            required={isStepVisible(4)}
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                marginBottom: "0.5rem",
                                textTransform: "capitalize",
                                accentColor: "#2f3136",
                                color: "#2f3136",
                                fontWeight: "600",
                                fontSize: "18px",
                                fontFamily: "Belgrano, serif",
                                letterSpacing: "0.5px",
                                lineHeight: "1.5",
                                border: "1px solid #e3e5e8",
                                borderRadius: "4px",
                                outline: "none",
                                transition: "border-color .2s ease-in-out",
                                backgroundColor: "#ADFFFF",
                                boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                            }}
                        />
                    </label>
                    <label style={{ display: isStepVisible(5) ? "block" : "none", marginBottom: "1rem" }}>
                        <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem", color: "rgba(8, 187, 182, 1)" }}>Escoge un narrador:</div>
                        <select
                            name="narrador"
                            value={narrador}
                            onChange={handleInputChange}
                            required={isStepVisible(5)}
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                marginBottom: "0.5rem",
                                textTransform: "capitalize",
                                accentColor: "#2f3136",
                                color: "#2f3136",
                                fontWeight: "600",
                                fontSize: "18px",
                                fontFamily: "Belgrano, serif",
                                letterSpacing: "0.5px",
                                lineHeight: "1.5",
                                border: "1px solid #e3e5e8",
                                borderRadius: "4px",
                                outline: "none",
                                transition: "border-color .2s ease-in-out",
                                backgroundColor: "#ADFFFF",
                                boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                            }}
                        >
                            <option value="">Selecciona un narrador</option>
                            <option value="Pedro">Pedro</option>
                            <option value="Lupe">Lupe</option>
                        </select>
                    </label>
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={handlePreviousStep}
                            style={{
                                backgroundColor: "#f44336",
                                color: "white",
                                padding: "0.5rem 1rem",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                marginRight: "1rem",
                                fontSize: "18px",
                                fontWeight: "600",
                            }}
                        >
                            Anterior
                        </button>
                    )}
                    {currentStep < 5 && (
                        <button
                            type="button"
                            onClick={handleNextStep}
                            style={{
                                backgroundColor: "#4caf50",
                                color: "white",
                                padding: "0.5rem 1rem",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "18px",
                                fontWeight: "600",
                            }}
                        >
                            Siguiente
                        </button>
                    )}
                    {currentStep === 5 && (
                        <button
                            type="submit"
                            style={{
                                backgroundColor: "#4caf50",
                                color: "white",
                                padding: "0.5rem 1rem",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "18px",
                                fontWeight: "600",
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