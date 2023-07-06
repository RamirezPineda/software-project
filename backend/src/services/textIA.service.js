import { PrismaClient } from "@prisma/client";
import { ChatGPTAPI } from "chatgpt";

const chatGPTAPI = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

const prisma = new PrismaClient();
const generarTexto = async ({personaje, nombrePersonaje, tema, reflexion, idUser}) => {
    console.log(personaje, nombrePersonaje, tema, reflexion, idUser);
    const text = await chatGPTAPI.sendMessage("Creame un cuento con un titulo(El titulo que este de principio todo mayuscula y este entre comillas) y con las siguientes caracteristicas: Personaje: " + personaje + ", Nombre del personaje: " + nombrePersonaje + ", Tema: " + tema + ", Reflexion: " + reflexion);
    /* console.log("text", text.text); */
    const titulo = text.text.split("\n")[0];
    console.log(titulo);
    const textArray = text.text.split("\n");
    textArray.shift();
    const texto = textArray.join("\n");
    console.log(texto);

    const newStory = await prisma.cuento.create({
        data: {
            personaje: personaje,
            nombrePersonaje: nombrePersonaje,
            tema: tema,
            reflexion: reflexion,
            titulo: titulo,
            texto: texto,
            authorId: idUser,
        },
    });

    return newStory;
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