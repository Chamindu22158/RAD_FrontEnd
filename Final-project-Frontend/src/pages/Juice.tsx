import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchInput from '../components/SearchInput';
import { useNavigate } from 'react-router-dom';

const Juice: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [selectedAlcohol, setSelectedAlcohol] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const nav = useNavigate();

    useEffect(()=> {
        (async ()=> {
            const params = new URLSearchParams({ category: 'juice' });
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim());
            }
            const res = await API.get(`/products?${params.toString()}`);
            setProducts(res.data);
        })();
    }, [searchQuery]);

    const buy = () => {
        nav('/payment', { state: { product: selected, selectedAlcohol } });
    };

    return (
        <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
            <div className="p-6 max-w-7xl mx-auto">
                <div className="mb-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
                    <h2 className="text-4xl font-bold mb-2">🍽️ Main Courses</h2>
                    <p className="text-amber-100">Delicious main courses prepared with fresh ingredients</p>
                </div>
                <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search main courses by name, description, or ingredients..." />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {products.map((p, index) => <ProductCard key={p._id || `product-${index}`} product={p} onClick={setSelected} />)}
                </div>
                {selected && <ProductModal product={selected} onClose={()=>setSelected(null)} onBuy={buy} onSelectAlcohol={setSelectedAlcohol} />}
            </div>
        </div>
    );
};

export default Juice;
