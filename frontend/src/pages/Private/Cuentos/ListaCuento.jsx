import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ListaCuento = () => {
  const [cuentos, setCuentos] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí debes realizar la solicitud al backend para obtener el JSON de los cuentos
    const fetchCuentos = async () => {
      try {
        const id = user.id;
        const response = await fetch(`http://127.0.0.1:3000/api/getTextoUser/${id}`);
        const data = await response.json();
        setCuentos(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCuentos();
  }, [user.id]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Lista de Cuentos</h2>
      {cuentos.length === 0 && <p>No hay cuentos disponibles.</p>}
      {cuentos.length > 0 && (
        <div>
          {cuentos.map((cuento) => (
            <div key={cuento.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{cuento.titulo}</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Personaje:</strong> {cuento.personaje}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Nombre del Personaje:</strong> {cuento.nombrePersonaje}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Tema:</strong> {cuento.tema}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Reflexión:</strong> {cuento.reflexion}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Fecha de creación:</strong> {cuento.createdAt}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Fecha de actualización:</strong> {cuento.updatedAt}
              </p>
              <button
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  // Aquí puedes agregar la lógica para ver el cuento completo
                  console.log('Ver cuento:', cuento.id);
                    navigate(`/private/cuento/${cuento.id}`);
                }}
              >
                Ver
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaCuento;
