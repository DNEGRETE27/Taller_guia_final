
import { useState } from 'react';

const Formulario = ({ agregarTarea }) => {
  const [texto, setTexto] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    const nuevaTarea = {
      id: Date.now(), 
      texto: texto.trim(),
    };

    agregarTarea(nuevaTarea);
    setTexto('');
  };

  return (
    <form onSubmit={manejarEnvio}>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe una tarea..."
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default Formulario;
