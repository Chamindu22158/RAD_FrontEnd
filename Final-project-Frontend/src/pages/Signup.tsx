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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-600 px-8 py-12 text-center">
                        <h1 className="text-4xl font-bold text-white mb-2">🍽️</h1>
                        <h2 className="text-3xl font-bold text-white mb-2">Gourmet Bistro</h2>
                        <p className="text-amber-100 text-sm">Restaurant Management</p>
                    </div>
                    
                    {/* Form */}
                    <div className="px-8 py-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h3>
                        {err && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
                                <p className="font-semibold text-sm">{err}</p>
                            </div>
                        )}
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                                <input 
                                    type="text"
                                    value={username} 
                                    onChange={e=>setUsername(e.target.value)} 
                                    placeholder="Your username"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400 transition-all duration-200" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <input 
                                    type="email"
                                    value={email} 
                                    onChange={e=>setEmail(e.target.value)} 
                                    placeholder="you@restaurant.com"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400 transition-all duration-200" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={e=>setPassword(e.target.value)} 
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-400 transition-all duration-200" 
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-6"
                            >
                                Create Account
                            </button>
                        </form>
                        <p className="text-center text-gray-600 text-sm mt-6">
                            Already have an account? <a href="/login" className="text-amber-600 font-semibold hover:text-amber-700">Sign in here</a>
                        </p>
                    </div>
                </div>
                
                {/* Footer */}
                <p className="text-center text-gray-600 text-xs mt-6">Secure registration • Your data is protected</p>
            </div>
        </div>
    );
};

export default Signup;
