import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { token } = useAuth();

    return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
