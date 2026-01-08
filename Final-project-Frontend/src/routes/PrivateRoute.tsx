import React, {type JSX, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute: React.FC<{ children: JSX.Element; admin?: boolean; }> = ({ children, admin=false }) => {
    const { user } = useContext(AuthContext);
    if (!user) return <Navigate to="/login" replace />;
    if (admin && user.role !== 'admin') return <Navigate to="/" replace />;
    return children;
};

export default PrivateRoute;
