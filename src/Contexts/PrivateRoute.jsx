import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { token, user } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/" replace />
    }

    if (user?.firstAccess && location.pathname !== "/create-account/stages") {
        return <Navigate to="/create-account/stages" replace />;
    }

    return children;
};

export default PrivateRoute;
