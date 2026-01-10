import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
    const [famousProducts, setFamousProducts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [selectedAlcohol, setSelectedAlcohol] = useState<string>('');
    const nav = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await API.get('/products?isFamous=true');
                setFamousProducts(res.data);
            } catch (err) {
                console.error('Failed to fetch famous products:', err);
            }
        })();
    }, []);

    const buy = () => {
        nav('/payment', { state: { product: selected, selectedAlcohol } });
    };

    return (
        <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
            <div className="p-6 max-w-7xl mx-auto">
                {/* Welcome Hero */}
                <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl p-12 text-white shadow-xl text-center">
                    <h2 className="text-5xl font-bold mb-4">Welcome to Gourmet Bistro</h2>
                    <p className="text-lg text-sky-100 mb-2">Discover our finest dishes and beverages</p>
                    <p className="text-sky-100">Select a category from the navbar to browse our main courses, beverages or appetizers.</p>
                </div>
                
                {/* Featured Items */}
                {famousProducts.length > 0 && (
                    <div className="mt-12">
                        <div className="text-center mb-10">
                            <h3 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                                <span className="text-4xl">⭐</span>
                                <span>Featured Items</span>
                            </h3>
                            <p className="text-gray-600">Customer favorites and chef's recommendations</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {famousProducts.map((p, index) => (
                                <ProductCard key={p._id || `famous-${index}`} product={p} onClick={setSelected} />
                            ))}
                        </div>
                    </div>
                )}
                
                {selected && (
                    <ProductModal 
                        product={selected} 
                        onClose={() => setSelected(null)} 
                        onBuy={buy} 
                        onSelectAlcohol={setSelectedAlcohol} 
                    />
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
