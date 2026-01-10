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
        <nav className="bg-white shadow-lg border-b-2 border-amber-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo & Brand */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-3xl">🍽️</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-700 transition-all duration-300">
                            Gourmet Bistro
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    {user && (
                        <div className="hidden md:flex items-center gap-8">
                            <Link 
                                to="/juice" 
                                className="text-gray-700 font-medium hover:text-amber-600 hover:border-b-2 hover:border-amber-600 pb-1 transition-all duration-200"
                            >
                                Main Course
                            </Link>
                            <Link 
                                to="/cocktail" 
                                className="text-gray-700 font-medium hover:text-amber-600 hover:border-b-2 hover:border-amber-600 pb-1 transition-all duration-200"
                            >
                                Beverages
                            </Link>
                            <Link 
                                to="/custom" 
                                className="text-gray-700 font-medium hover:text-amber-600 hover:border-b-2 hover:border-amber-600 pb-1 transition-all duration-200"
                            >
                                Appetizers
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right Section - User & Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="hidden sm:inline text-gray-700 font-medium">👤 {user.username}</span>
                            {user.role === 'admin' && (
                                <Link 
                                    to="/admin" 
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    ⚙️ Admin
                                </Link>
                            )}
                            <button 
                                onClick={handleLogout} 
                                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="px-4 py-2 border-2 border-amber-600 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
