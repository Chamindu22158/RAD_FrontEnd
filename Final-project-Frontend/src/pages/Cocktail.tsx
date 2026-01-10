import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchInput from '../components/SearchInput';
import { useNavigate } from 'react-router-dom';

const Cocktail: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const nav = useNavigate();

    useEffect(()=> {
        (async ()=> {
            const params = new URLSearchParams({ category: 'cocktail' });
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim());
            }
            const res = await API.get(`/products?${params.toString()}`);
            setProducts(res.data);
        })();
    }, [searchQuery]);

    const buy = () => {
        nav('/payment', { state: { product: selected } });
    };

    return (
        <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
            <div className="p-6 max-w-7xl mx-auto">
                <div className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
                    <h2 className="text-4xl font-bold mb-2">🥤 Beverages</h2>
                    <p className="text-blue-100">Refreshing beverages to complement your meal</p>
                </div>
                <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search beverages by name, description, or ingredients..." />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {products.map((p, index) => <ProductCard key={p._id || `product-${index}`} product={p} onClick={setSelected} />)}
                </div>
                {selected && <ProductModal product={selected} onClose={()=>setSelected(null)} onBuy={buy} />}
            </div>
        </div>
    );
};

export default Cocktail;
