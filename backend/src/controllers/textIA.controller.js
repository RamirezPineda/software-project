import { log } from 'console';
import TextoIA from '../services/textIA.service.js';

const generarTexto = async (req, res) => {
    try {
        const { personaje, nombrePersonaje, tema, reflexion,narrador, idioma,nombreIdioma,idUser } = req.body;
        console.log(idioma);
        console.log(nombreIdioma);
        const newTexto = await TextoIA.generarTexto({ personaje, nombrePersonaje, tema, reflexion, narrador,idioma,nombreIdioma,idUser });
        if (!newTexto)
            return res.status(400).json({ message: "El texto no se pudo generar" });

        return res.status(201).json(newTexto);
    } catch (error) {
        console.log("ERROR SERVER!", error);
        return res.status(500).json(error);
    }
};

const getTextos = async (req, res) => {
    try {
        const textos = await TextoIA.getTextos();
        if (!textos) return res.status(400).json({ message: "No hay textos" });

        return res.status(200).json(textos);
    } catch (error) {
        console.log("Error Server: ", error);
        return res.status(500).json(error);
    }
};

const getTexto = async (req, res) => {
    try {
        const { id } = req.params;
        const texto = await TextoIA.getTexto(parseInt(id));
        if (!texto) return res.status(400).json({ message: "El texto no existe" });

        return res.status(200).json(texto);
    } catch (error) {
        console.log("Error Server: ", error);
        return res.status(500).json(error);
    }
};

const getTextoUser = async (req, res) => {
    try {
        const { idUser } = req.params;
        const texto = await TextoIA.getTextoUser(parseInt(idUser));
        if (!texto) return res.status(400).json({ message: "El texto no existe" });

        return res.status(200).json(texto);
    } catch (error) {
        console.log("Error Server: ", error);
        return res.status(500).json(error);
    }
};

export default { generarTexto, getTexto , getTextoUser, getTextos };