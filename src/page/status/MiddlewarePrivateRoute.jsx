import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

// Este componente se utiliza para proteger las rutas privadas
//(redirige a la ruta '/not-authorized' si el usuario no ha iniciado sesión).
const MiddlewarePrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default MiddlewarePrivateRoute;
