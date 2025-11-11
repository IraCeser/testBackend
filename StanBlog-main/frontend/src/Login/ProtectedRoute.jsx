import { useUser } from '../Contexts/UserContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        if (user.role === 'Administrator') {
            return <Navigate to="/admin-front-page" replace />;
        } else {
            return <Navigate to="/main-page" replace />;
        }
    }

    return children;
}

export default ProtectedRoute;