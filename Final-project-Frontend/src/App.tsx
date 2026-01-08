import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import Juice from './pages/Juice';
import Cocktail from './pages/Cocktail';
import Custom from './pages/Custom';
import Payment from './pages/Payment';
import Slip from './pages/Slip';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './routes/PrivateRoute';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
                <Navbar />
                <div className="min-h-[calc(100vh-64px)]">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
                    <Route path="/juice" element={<PrivateRoute><Juice /></PrivateRoute>} />
                    <Route path="/cocktail" element={<PrivateRoute><Cocktail /></PrivateRoute>} />
                    <Route path="/custom" element={<PrivateRoute><Custom /></PrivateRoute>} />
                    <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
                    <Route path="/slip" element={<PrivateRoute><Slip /></PrivateRoute>} />
                    <Route path="/admin" element={<PrivateRoute admin><AdminDashboard /></PrivateRoute>} />
                    <Route path="/payment/:id" element={<Payment />} />

                </Routes>
            </div>
        </div>
        </AuthProvider>
    );
};

export default App;
