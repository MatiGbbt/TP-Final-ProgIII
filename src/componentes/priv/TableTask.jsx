import axios from 'axios';
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const URLAPi = process.env.REACT_APP_URL_API;

const TableTask = ({ getTasks, onDelete, onEdit }) => {
  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '',
      key: 'delete-add',
      render: (text, record) => (
        <>
          <DeleteOutlined
            className="icon"
            onClick={() => handleDeleteTask(record._id)}
          />

          <EditOutlined
            className="icon"
            onClick={() => handleEditTask(record)}
          />
        </>
      ),
    },
  ];
  const handleDeleteTask = async id => {
    try {
      await axios.delete(`${URLAPi}/api/deleteTask/${id}`);

      if (onDelete) onDelete();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = async task => {
    if (onEdit) onEdit(task);
  };

  return (
    <div>
      <Table
        dataSource={getTasks}
        className="table"
        columns={columns}
        rowKey="_id"
        locale={{ emptyText: <h2>No hay tareas disponibles</h2> }}
        pagination={{
          pageSize: 6,
        }}
      />
    </div>
  );
};

export default TableTask;
