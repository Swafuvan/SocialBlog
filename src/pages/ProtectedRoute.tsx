import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
    const token = localStorage.getItem('userToken');

    return token ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoutes
