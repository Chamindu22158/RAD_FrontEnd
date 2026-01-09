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
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8 space-y-6">
            <div className="border-b border-amber-100 pb-6">
                <h3 className="text-3xl font-bold text-gray-800">Add Menu Item</h3>
                <p className="text-gray-600 text-sm mt-1">Create a new menu item for your restaurant</p>
            </div>

            <div className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Item Name *</label>
                    <input 
                        value={name} 
                        onChange={e=>setName(e.target.value)} 
                        placeholder="e.g., Grilled Salmon"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 transition-all duration-200" 
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL *</label>
                    <input 
                        value={image} 
                        onChange={e=>setImage(e.target.value)} 
                        placeholder="https://example.com/image.jpg"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 transition-all duration-200" 
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select 
                        value={category} 
                        onChange={e=>setCategory(e.target.value as any)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 transition-all duration-200"
                    >
                        <option value="juice" className="bg-white text-gray-800">Main Course</option>
                        <option value="cocktail" className="bg-white text-gray-800">Beverages</option>
                        <option value="custom" className="bg-white text-gray-800">Appetizers</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                    <textarea 
                        value={description} 
                        onChange={e=>setDescription(e.target.value)} 
                        placeholder="Describe the dish, its preparation, and flavor profile..."
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 transition-all duration-200" 
                    />
                </div>

                {/* Ingredients */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ingredients (comma separated) *</label>
                    <input 
                        value={ingredients} 
                        onChange={e=>setIngredients(e.target.value)} 
                        placeholder="e.g., Salmon, Lemon, Garlic, Olive Oil"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 transition-all duration-200" 
                    />
                </div>

                {/* Add-ons / Extras */}
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Add-ons / Extras</label>
                    <input 
                        value={alcoholBrands} 
                        onChange={e=>setAlcoholBrands(e.target.value)} 
                        placeholder="e.g., Extra Cheese, Bacon, Grilled Vegetables (comma separated)"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 transition-all duration-200" 
                    />
                    <p className="text-xs text-gray-600 mt-2">Optional: List available add-ons customers can choose from</p>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($) *</label>
                    <input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        value={price} 
                        onChange={e=>setPrice(e.target.value)} 
                        placeholder="0.00"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 transition-all duration-200" 
                    />
                </div>

                {/* Featured Item */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-orange-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={isFamous} 
                            onChange={e=>setIsFamous(e.target.checked)} 
                            className="w-5 h-5 text-amber-600 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500" 
                        />
                        <span className="font-semibold text-gray-700">⭐ Mark as Featured Item</span>
                    </label>
                    <p className="text-xs text-gray-600 mt-2 ml-8">Featured items will be highlighted on the home page</p>
                </div>
            </div>

            {/* Submit Button */}
            <button 
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-8"
            >
                Create Menu Item
            </button>
        </form>
    );
};

export default AdminProductForm;
