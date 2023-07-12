import { BASE_URL } from "../constants/routes";

export const texToAudioUrl = BASE_URL + "/api/generarTexto";

const crearCuento = async ({
  personaje,
  nombrePersonaje,
  tema,
  reflexion,
  narrador,
  idioma,
  nombreIdioma,
  idUser,
}) => {
  const response = await fetch(texToAudioUrl, {
    method: "POST",
    body: JSON.stringify({
      personaje,
      nombrePersonaje,
      tema,
      reflexion,
      narrador,
      idioma,
      nombreIdioma,
      idUser,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export { crearCuento };
