import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { token, firstAccess } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" replace />
    }

    // Impede o acesso à rota de 'create-account/stages' se o firstAccess for false
    if (location.pathname === "/create-account/stages" && !firstAccess) {
        return <Navigate to="/home" replace />;
    }

    // Consegue acesso a rota 'create-account/stages' se o firstAccess for true
    if (firstAccess && location.pathname !== "/create-account/stages") {
        return <Navigate to="/create-account/stages" replace />;
    }

    return children;
};

export default PrivateRoute;
