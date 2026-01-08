import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const [err, setErr] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        try {
            await API.post('/auth/signup', { username, email, password });
            nav('/login');
        } catch (e:any) {
            setErr(e.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto mt-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-4 border-purple-500/30 p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 text-center">Signup</h2>
                {err && <div className="bg-red-900/50 text-red-300 p-3 mb-4 rounded-lg border-2 border-red-500/50">{err}</div>}
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
                    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
