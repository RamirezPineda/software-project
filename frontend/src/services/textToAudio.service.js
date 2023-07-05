import { BASE_URL } from "../constants/routes";

export const texToAudioUrl = BASE_URL + "/api/textToAudio";


const textToAudio = async ( { arg }) => {
  const response = await fetch(texToAudioUrl, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export { textToAudio};
