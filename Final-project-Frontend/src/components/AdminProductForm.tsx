import React, { useState } from 'react';
import API from '../api/axios';

const AdminProductForm: React.FC<{ onCreated: ()=>void }> = ({ onCreated }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<'juice'|'cocktail'|'custom'>('juice');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [alcoholBrands, setAlcoholBrands] = useState('');
    const [isFamous, setIsFamous] = useState(false);
    const [price, setPrice] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await API.post('/products', {
            name, image, category, description,
            ingredients: ingredients.split(',').map(s=>s.trim()).filter(Boolean),
            alcoholBrands: alcoholBrands.split(',').map(s=>s.trim()).filter(Boolean),
            isFamous,
            price: price ? parseFloat(price) : undefined
        });
        setName(''); setImage(''); setDescription(''); setIngredients(''); setAlcoholBrands(''); setIsFamous(false); setPrice('');
        onCreated();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-purple-500/30 p-6 rounded-xl shadow-2xl space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">Add Product</h3>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
            <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" className="w-full border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
            <select value={category} onChange={e=>setCategory(e.target.value as any)} className="w-full border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white">
                <option value="juice" className="bg-gray-700">Juice</option>
                <option value="cocktail" className="bg-gray-700">Cocktail</option>
                <option value="custom" className="bg-gray-700">Custom</option>
            </select>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
            <input value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" className="w-full border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
            <input value={alcoholBrands} onChange={e=>setAlcoholBrands(e.target.value)} placeholder="Alcohol brands (comma separated, for custom)" className="w-full border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
            <input type="number" step="0.01" min="0" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price ($)" className="w-full border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
            <label className="flex items-center gap-2 p-3 bg-purple-900/50 rounded-lg border-2 border-purple-500/30">
                <input type="checkbox" checked={isFamous} onChange={e=>setIsFamous(e.target.checked)} className="w-5 h-5 text-purple-400 focus:ring-purple-400 rounded" />
                <span className="font-semibold text-purple-300">Mark as Famous Item</span>
            </label>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg w-full">Create Product</button>
        </form>
    );
};

export default AdminProductForm;
