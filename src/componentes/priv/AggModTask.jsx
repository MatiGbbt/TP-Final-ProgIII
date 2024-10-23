import { Input, Button, Form, Drawer } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_URL_API;

const AggModTask = ({ onConfirm, TaskEdit, isVisible, setVisible }) => {
  const [form] = Form.useForm(); // Crea la referencia del formulario

  // Carga datos de la tarea seleccionada para editar
  useEffect(() => {
    if (TaskEdit) {
      form.setFieldsValue({
        title: TaskEdit.title || '',
        description: TaskEdit.description || '',
        user: TaskEdit.user || '',
      });
    } else {
      form.resetFields();
    }
  }, [TaskEdit, form]);

  const handleFinish = async values => {
    if (TaskEdit) {
      await putTask(values); // Edita tarea
    } else {
      await postTask(values); // Crea nueva tarea
    }

    form.resetFields(); // Limpia el formulario
    setVisible(false);
  };

  const putTask = async fields => {
    try {
      await axios.put(`${URL}/api/updateTask/${TaskEdit._id}`, fields);
      if (onConfirm) onConfirm(); // Actualiza la lista de tareas
    } catch (error) {
      console.error('Error put:', error);
    }
  };

  const postTask = async fields => {
    try {
      await axios.post(`${URL}/api/createTask`, fields);
      if (onConfirm) onConfirm(); // Actualizamos la lista de tareas
    } catch (error) {
      console.error('Error post:', error);
    }
  };

  return (
    <section className="form-section">
      <Drawer
        title={TaskEdit ? 'Editar Tarea' : 'Nueva Tarea'}
        width={400}
        onClose={() => setVisible(false)} // Cierra el Drawer
        open={isVisible} // Controla la visibilidad con la prop
      >
        {/* Vincula el formulario con la instancia creada usando "form" */}
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            name="title"
            label="Título de la Tarea"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el Título',
              },
            ]}
          >
            <Input placeholder="Título de la Tarea" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descripción"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese la descripción de la tarea',
              },
            ]}
          >
            <Input placeholder="Descripción de la Tarea" />
          </Form.Item>

          <Form.Item
            name="user"
            label="Usuario"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el usuario',
              },
            ]}
          >
            <Input placeholder="Usuario asignado" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {TaskEdit ? 'Actualizar' : 'Crear'}
            </Button>
            <Button onClick={() => setVisible(false)}>Cancelar</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </section>
  );
};

export default AggModTask;
