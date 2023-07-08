import { PrismaClient } from "@prisma/client";
import { ChatGPTAPI } from "chatgpt";
import amazonPolly from "../services/amazonPolly.service.js";
import { v4 } from 'uuid';

const chatGPTAPI = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

const prisma = new PrismaClient();
const generarTexto = async ({personaje, nombrePersonaje, tema, reflexion,narrador, idUser}) => {
    console.log(personaje, nombrePersonaje, tema, reflexion, idUser);
    const text = await chatGPTAPI.sendMessage("Creame un cuento con un titulo(El titulo que este de principio todo mayuscula y este entre comillas) y con las siguientes caracteristicas: Personaje: " + personaje + ", Nombre del personaje: " + nombrePersonaje + ", Tema: " + tema + ", Reflexion: " + reflexion);
    const titulo = text.text.split("\n")[0];
    console.log(titulo);
    const textArray = text.text.split("\n");
    textArray.shift();
    const texto = textArray.join("\n");
    console.log(texto);

    const audio = await generarAudio(text.text, narrador, 'es-US', 'neural');

    console.log(audio.SynthesisTask.OutputUri);

    const newStory = await prisma.cuento.create({
        data: {
            personaje: personaje,
            nombrePersonaje: nombrePersonaje,
            tema: tema,
            reflexion: reflexion,
            titulo: titulo,
            texto: texto,
            audio: audio.SynthesisTask.OutputUri,
            authorId: idUser,
        },
    });

    return newStory;
};

const generarAudio = async (texto, voiceId, languageCode, engine) => {
    console.log(texto, voiceId, languageCode, engine);
    const audio = await new amazonPolly().transform({
        Text: texto,
        OutputFormat: 'mp3',
        VoiceId: voiceId,
        LanguageCode: languageCode,
        Engine: engine,
        OutputS3BucketName: process.env.BUCKET || 'aws-sw1',
        OutputS3KeyPrefix: v4(),
    });
    return audio;
};

const getTextos = async () => {
    const textosFound = await prisma.cuento.findMany();
    return textosFound;
};

const getTexto = async (id) => {
    const textoFound = await prisma.cuento.findUnique({ where: { id } });
    return textoFound;
};

const getTextoUser = async (idUser) => {
    const textoFound = await prisma.cuento.findMany({ where: { authorId: idUser } });
    return textoFound;
};

export default { generarTexto, getTexto , getTextoUser, getTextos};