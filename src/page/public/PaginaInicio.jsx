import { useAuth0 } from '@auth0/auth0-react';

const PaginaInicio = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      <h1 style={{ color: '#e76f51' }}>
        {isAuthenticated ? `¡Hola ${user.name}!` : '¡Bienvenido!'} Gestiona tus
        Tareas
      </h1>
      <p>Organiza tus tareas y aumenta tu productividad.</p>
    </div>
  );
};

export default PaginaInicio;
