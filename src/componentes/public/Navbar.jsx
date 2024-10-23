import { useAuth0 } from '@auth0/auth0-react';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();
  const navigate = useNavigate(); // Hook para navegación

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <header className="App-header">
      <h1 onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
        ABM-Task
      </h1>

      <section className="navbar">
        {isAuthenticated ? (
          <section className="logout">
            <Link to="/tareas" className="task-link">
              Tareas
            </Link>
            <h3>{user.name}</h3>
            <img
              alt="userLogo"
              style={{ borderRadius: '40%', width: '50px' }}
              src={user.picture}
            />
            <LogoutOutlined
              style={{ fontSize: '50px', cursor: 'pointer' }}
              onClick={() => {
                logout(); // cierra la sesion
                navigate('/home');
              }}
            />
          </section>
        ) : (
          <LoginOutlined
            style={{ fontSize: '50px', cursor: 'pointer' }}
            onClick={() => loginWithRedirect()}
          />
        )}
      </section>
    </header>
  );
};

export default Navbar;
