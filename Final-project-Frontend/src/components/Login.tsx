import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const nav = useNavigate();
    const [err, setErr] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        try {
            const res = await API.post('/auth/login', { email, password });
            const { accessToken, user } = res.data;
            login(accessToken, user);
            if (user.role === 'admin') nav('/admin'); else nav('/');
        } catch (e:any) {
            setErr(e.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl mb-4">Login</h2>
            {err && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{err}</div>}
            <form onSubmit={submit} className="flex flex-col gap-2">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="border p-2" />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="border p-2" />
                <button className="bg-blue-600 text-white p-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
