// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tarea from './components/Tarea';

function App() {
  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // Filtro para las tareas

  // Cargar tareas desde localStorage cuando la app se monte
  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
    if (tareasGuardadas) {
      setTareas(tareasGuardadas);
    }
  }, []);

  // Guardar tareas en localStorage cada vez que el estado cambie
  useEffect(() => {
    if (tareas.length > 0) {
      localStorage.setItem('tareas', JSON.stringify(tareas));
    }
  }, [tareas]);

  const agregarTarea = (tarea) => {
    setTareas([...tareas, tarea]);
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const toggleTareaCompletada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'completadas') return tarea.completada;
    if (filtro === 'pendientes') return !tarea.completada;
    return true; // 'todos'
  });

  return (
    <div className="App">
      <h1>Gestor de Tareas</h1>
      <Formulario agregarTarea={agregarTarea} />
      <div>
        <button onClick={() => setFiltro('todos')}>Todos</button>
        <button onClick={() => setFiltro('pendientes')}>Pendientes</button>
        <button onClick={() => setFiltro('completadas')}>Completadas</button>
      </div>
      <div>
        {tareasFiltradas.length === 0 ? (
          <p>No hay tareas pendientes</p>
        ) : (
          tareasFiltradas.map((tarea) => (
            <Tarea
              key={tarea.id}
              tarea={tarea}
              eliminarTarea={eliminarTarea}
              toggleTareaCompletada={toggleTareaCompletada}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
