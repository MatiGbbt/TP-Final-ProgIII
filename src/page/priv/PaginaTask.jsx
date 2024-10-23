import { useEffect, useState } from 'react';
import axios from 'axios';
import AggModTask from '../../componentes/priv/AggModTask';
import TableTask from '../../componentes/priv/TableTask';
const URLAPi = process.env.REACT_APP_URL_API;

const PaginaTask = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false); // Maneja la visibilidad del Drawer
  const [getTasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchData = async () => {
    try {
      const resp = await axios.get(`${URLAPi}/api/getTasks`);
      setTasks(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Maneja el clic en el botón de "Nueva Tarea"
  const handleAddNewTask = () => {
    setSelectedTask(null); //  "Nueva Tarea"
    setDrawerVisible(true);
  };

  // Maneja el clic en "Editar"
  const handleEditTask = task => {
    setSelectedTask(task); // tarea seleccionada
    setDrawerVisible(true);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <a onClick={handleAddNewTask} href="#null" className="task-link">
        Nueva Tarea
      </a>

      <AggModTask
        isVisible={isDrawerVisible} // Pasa el estado de visibilidad al Drawer
        TaskEdit={selectedTask}
        setVisible={setDrawerVisible} // Controlar la visibilidad del Drawer
        onConfirm={fetchData}
      />

      <TableTask
        onEdit={handleEditTask}
        getTasks={getTasks}
        onDelete={fetchData}
      />
    </div>
  );
};

export default PaginaTask;
