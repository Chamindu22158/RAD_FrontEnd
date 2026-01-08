import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { ProductCard } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchInput from '../components/SearchInput';
import { useNavigate } from 'react-router-dom';

const Custom: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [selectedAlcohol, setSelectedAlcohol] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const nav = useNavigate();

    useEffect(()=> {
        (async ()=> {
            const params = new URLSearchParams({ category: 'custom' });
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
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">🎨 Custom Mixes</h2>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search custom mixes by name, description, or ingredients..." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {products.map((p, index) => <ProductCard key={p._id || `product-${index}`} product={p} onClick={setSelected} />)}
            </div>
            {selected && <ProductModal product={selected} onClose={()=>setSelected(null)} onBuy={buy} onSelectAlcohol={setSelectedAlcohol} />}
        </div>
    );
};

export default Custom;
