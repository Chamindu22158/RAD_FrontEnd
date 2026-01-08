import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface IUser { id: string; email: string; role: string; username: string }
interface IAuthContext {
    user: IUser | null;
    login: (accessToken: string, user: IUser) => void;
    logout: () => Promise<void>;
    getAccessToken: () => string | null;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    login: () => {},
    logout: async () => {},
    getAccessToken: () => null
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const u = localStorage.getItem('user');
        if (token && u) setUser(JSON.parse(u));
    }, []);

    const login = (accessToken: string, user: IUser) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const logout = async () => {
        try {
            await API.post('/auth/logout');
        } catch (e) { /* ignore */ }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const getAccessToken = () => localStorage.getItem('accessToken');

    return (
        <AuthContext.Provider value={{ user, login, logout, getAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
