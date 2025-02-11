import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>🔄 Carregando...</p>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
