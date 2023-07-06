import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import htmlDocx from "html-docx-js/dist/html-docx";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDocument,
  nuevoDocument,
  saveDocument,
} from "../../../redux/states/document.state";
import { textToAudio } from "../../../services/textToAudio.service";

export const EditarCuento = () => {
  const editor = useRef(null);
  const [urlAudio, setAudio] = useState("");
  const [loading, setLoading] = useState(false);
  const [voz, setVoz] = useState("Pedro");
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.document);

  const config = {
    width: "90%",
    readonly: false,
    height: 700,
  };

  const handleExportToWord = () => {
    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body background="https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-cartoon-fairy-tale-field-background-design-backgroundillustration-backgroundfairy-tale-image_64088.jpg"> 
    ${content} 
    </body>
    </html>`;
    const convertedDocx = htmlDocx.asBlob(htmlContent);

    // Descargar el archivo .docx
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(convertedDocx);
    downloadLink.download = "documento.docx";
    downloadLink.click();
  };

  const crearAudio = async () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    const text = tempElement.textContent || tempElement.innerText;

    const res = await textToAudio({
      arg: { text, voiceId: voz, languageCode: "es-US", engine: "neural" },
    });
    //console.log(res.SynthesisTask.OutputUri);
    setLoading(true);
    setTimeout(() => {
      console.log("Después de 15 segundo");
      const nuevaurl = res.SynthesisTask.OutputUri;
      setAudio(nuevaurl);
      setLoading(false);
    }, 15000);
  };

  const handleChangeVoz = (e) => {
    setVoz(e.target.value);
  };

  return (
    <>
      <div className="flex-col w-full">
        <div className="flex flex-row">
          <audio controls className="mb-6 mr-3" src={urlAudio}></audio>
          {loading && (
            <img
              className="w-14 h-14 mr-3"
              src="https://media.tenor.com/wpSo-8CrXqUAAAAj/loading-loading-forever.gif"
              alt="Cargando..."
            />
          )}
          <button
            className="rounded-sm btn bg-orange-400 mr-2 p-1 hover:bg-orange-500 h-14 "
            onClick={crearAudio}
          >
            Generar Audio
          </button>
          <select className="h-14" name="voz" id="" onChange={handleChangeVoz}>
            <option value="Pedro">Pedro</option>
            <option value="Lupe">Lupe</option>
          </select>
        </div>

        <div className="text-white">
          <button
            className="rounded-sm btn bg-orange-400 mr-2 p-1 hover:bg-orange-500 "
            onClick={() => dispatch(saveDocument(content))}
          >
            Guardar Documento
          </button>
          <button
            className="rounded-sm btn bg-orange-400 mr-2 p-1 hover:bg-orange-500"
            onClick={() => dispatch(loadDocument())}
          >
            Cargar Último
          </button>
          <button
            className="rounded-sm btn bg-orange-400 mr-2 p-1 hover:bg-orange-500"
            onClick={() => dispatch(nuevoDocument())}
          >
            Nuevo
          </button>
          <button
            className="rounded-sm btn bg-orange-400 mr-2 p-1 hover:bg-orange-500"
            onClick={handleExportToWord}
          >
            exportar a word
          </button>
        </div>
        <div className="mt-3 text-black">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => dispatch(saveDocument(newContent))} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              console.log(newContent);
            }}
          />
        </div>
      </div>
    </>
  );
};
