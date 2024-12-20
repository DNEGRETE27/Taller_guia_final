// src/Tarea.jsx
const Tarea = ({ tarea, eliminarTarea, toggleTareaCompletada }) => {
    return (
      <div className={`tarea ${tarea.completada ? 'completada' : ''}`}>
        <span onClick={() => toggleTareaCompletada(tarea.id)}>{tarea.texto}</span>
        <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
      </div>
    );
  };
  
  export default Tarea;
  