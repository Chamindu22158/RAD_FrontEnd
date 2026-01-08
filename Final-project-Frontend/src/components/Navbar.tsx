import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useContext(AuthContext);
    const nav = useNavigate();

    const handleLogout = async () => {
        await logout();
        nav('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 text-white px-4 py-4 flex justify-between items-center shadow-2xl border-b-4 border-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300">
                    🥤 Juice Bar
                </Link>
                {user && (
                    <>
                        <Link to="/juice" className="hover:text-purple-400 transition-colors font-medium hover:scale-105 transform duration-200">Juice</Link>
                        <Link to="/cocktail" className="hover:text-pink-400 transition-colors font-medium hover:scale-105 transform duration-200">Cocktail</Link>
                        <Link to="/custom" className="hover:text-cyan-400 transition-colors font-medium hover:scale-105 transform duration-200">Custom</Link>
                    </>
                )}
            </div>
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <span className="hidden sm:inline bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">{user.username}</span>
                        {user.role === 'admin' && <Link to="/admin" className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">Admin</Link>}
                        <button onClick={handleLogout} className="px-4 py-1 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="px-4 py-1 border-2 border-purple-400 rounded-lg font-semibold hover:bg-purple-400 hover:text-gray-900 transition-all duration-300">Login</Link>
                        <Link to="/signup" className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
