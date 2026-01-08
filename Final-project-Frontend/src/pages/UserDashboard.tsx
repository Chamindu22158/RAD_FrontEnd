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
        <div className="p-6 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">Welcome to Juice Bar</h2>
                <p className="text-lg text-gray-300">Select a category from the navbar to browse juices, cocktails or custom mixes.</p>
            </div>
            
            {famousProducts.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3 text-white">
                        <span className="text-purple-400 text-4xl">⭐</span>
                        <span>Famous Items</span>
                    </h3>
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
    );
};

export default UserDashboard;
