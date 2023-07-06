import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import HTMLFlipBook from "react-pageflip";

const VerCuento = () => {
  const { id } = useParams();
  const [cuento, setCuento] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchCuento = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/getTexto/${id}`);
        const data = await response.json();
        console.log(data.texto);
        setCuento(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCuento();
  }, [id]);

  const exportAsPDF = () => {
    if (!cuento) {
      return;
    }

    const content = contentRef.current;
    const options = {
      filename: "cuento.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait", autoSize: true },
    };

    html2pdf().set(options).from(content).save();
  };

  if (!cuento) {
    return <p>Cargando el cuento...</p>;
  }

  const { titulo, texto } = cuento;
  const paragraphs = texto.split("\n\n");
  const pages = [];

  paragraphs.forEach((paragraph, index) => {
    const pageContent = (
      <div key={index} className="page-content">
        <p style={{ fontSize: "1.2rem", lineHeight: "1.5", textAlign: "justify", whiteSpace: "pre-line", color: "#fff" }}>{paragraph}</p>
      </div>
    );
    pages.push(pageContent);
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto", backgroundColor: "#333", color: "#fff", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#fff" }}>{titulo}</h2>
      <div style={{ display: "none" }} ref={contentRef}>
        {pages}
      </div>
      <HTMLFlipBook width={800} height={600} size="stretch" minWidth={315} maxWidth={800} minHeight={400} maxHeight={600}>
        {pages.map((page, index) => (
          <div key={index} className="page">
            <div className="page-container">{page}</div>
          </div>
        ))}
      </HTMLFlipBook>
      <button
        onClick={exportAsPDF}
        style={{
          backgroundColor: "#4caf50",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Exportar como PDF
      </button>
    </div>
  );
};

export default VerCuento;
