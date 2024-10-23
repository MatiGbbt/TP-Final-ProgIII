import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './componentes/public/Navbar';
import PaginaInicio from './page/public/PaginaInicio';
import PaginaTask from './page/priv/PaginaTask';
import ERROR401 from './page/status/ERROR401';
import MiddlewarePrivateRoute from './page/status/MiddlewarePrivateRoute';
import { Spin } from 'antd';
import './App.css';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Spin style={{ justifyContent: 'center' }} size="large" />;
  }

  return (
    <div className="App">
      <Router>
        {/* Navbar */}
        <Navbar />

        <Routes>
          {/* error ruta Privada */}
          <Route path="/not-authorized" element={<ERROR401 />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<PaginaInicio />} />

          {/* Ruta protegida */}
          <Route
            path="/tareas"
            element={
              <MiddlewarePrivateRoute>
                <PaginaTask />
              </MiddlewarePrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
