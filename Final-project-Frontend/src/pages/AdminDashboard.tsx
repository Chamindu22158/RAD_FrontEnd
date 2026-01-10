import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import AdminProductForm from '../components/AdminProductForm';
import SearchInput from '../components/SearchInput';

const AdminDashboard: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

    const fetchAll = async () => {
        const params = new URLSearchParams();
        if (searchQuery.trim()) {
            params.append('search', searchQuery.trim());
        }
        const [pRes, oRes] = await Promise.all([
            API.get(`/products?${params.toString()}`), 
            API.get('/orders')
        ]);
        setProducts(pRes.data);
        setOrders(oRes.data);
    };

    useEffect(()=> { fetchAll(); }, [searchQuery]);

    const handleDelete = async (id: string) => {
        if (!id) {
            alert('Invalid product ID');
            console.error('Delete failed: Invalid product ID');
            return;
        }
        if (!confirm('Delete product?')) return;

        try {
            console.log('Deleting product with ID:', id);
            const response = await API.delete(`/products/${id}`);
            console.log('Delete response:', response);

            // Remove the product from local state immediately for better UX
            setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
            alert('Product deleted successfully!');
        } catch (error: any) {
            console.error('Delete failed:', error);
            alert(`Failed to delete product: ${error.response?.data?.message || error.message}`);
            // Refresh data in case of error to ensure UI is in sync
            fetchAll();
        }
    };

    const handleToggleFamous = async (id: string, currentStatus: boolean) => {
        if (!id) {
            alert('Invalid product ID');
            return;
        }
        await API.put(`/products/${id}`, { isFamous: !currentStatus });
        fetchAll();
    };

    const handleUpdatePrice = async (id: string, newPrice: string) => {
        if (!id) {
            alert('Invalid product ID');
            return;
        }
        const priceValue = newPrice ? parseFloat(newPrice) : undefined;
        await API.put(`/products/${id}`, { price: priceValue });
        fetchAll();
    };

    const handleImageError = (productId: string) => {
        setImageErrors(prev => new Set(prev).add(productId));
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
                <h2 className="text-4xl font-bold mb-2">🍽️ Restaurant Management</h2>
                <p className="text-teal-100 text-lg">Manage your menu items, view orders, and track customer activity</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-1">
                    <AdminProductForm onCreated={fetchAll} />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-2xl shadow-xl border border-teal-100 p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-teal-200 pb-4">📋 Menu Items</h3>
                        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search products by name, description, or ingredients..." />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                            {products.map((p, index) => (
                                <div key={p.id || `product-${index}`} className="bg-white border border-teal-100 p-5 rounded-xl shadow-lg hover:shadow-xl hover:border-teal-300 transition-all duration-300">
                                    <img 
                                        src={imageErrors.has(p.id) ? 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop' : p.image} 
                                        alt={p.name} 
                                        className="h-40 w-full object-cover rounded-lg mb-4" 
                                        onError={() => handleImageError(p.id)}
                                    />
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-bold text-gray-800 text-lg">{p.name}</h4>
                                                <p className="text-sm text-gray-600 capitalize">{p.category === 'juice' ? 'Main Course' : p.category === 'cocktail' ? 'Beverages' : 'Appetizers'}</p>
                                                {p.isFamous && <span className="text-xs bg-gradient-to-r from-blue-500 to-blue-500 text-white px-3 py-1 rounded-full font-semibold mt-2 inline-block">⭐ Featured</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={()=>handleToggleFamous(p.id, p.isFamous || false)} 
                                                    className={`px-2 py-1 rounded-lg text-sm font-semibold transition-all duration-300 ${p.isFamous ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white hover:from-blue-600 hover:to-blue-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                                >
                                                    {p.isFamous ? '⭐' : '☆'}
                                                </button>
                                                <button onClick={()=>handleDelete(p.id)} className="px-2 py-1 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-all duration-300">Delete</button>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                                            <div className="flex gap-2">
                                                <input 
                                                    type="number" 
                                                    step="0.01" 
                                                    min="0" 
                                                    defaultValue={p.price || ''} 
                                                    onBlur={(e) => {
                                                        if (e.target.value !== (p.price?.toString() || '')) {
                                                            handleUpdatePrice(p.id, e.target.value);
                                                        }
                                                    }}
                                                    className="flex-1 border border-teal-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400"
                                                    placeholder="0.00"
                                                />
                                                <span className="text-lg font-bold text-teal-600 pt-2">${p.price?.toFixed(2) || '0.00'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl shadow-xl border border-teal-100 p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-teal-200 pb-4">📦 Customer Orders</h3>
                        <div className="mt-6 overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-gradient-to-r from-blue-600 to-blue-600">
                                <tr>
                                    <th className="p-4 text-white font-bold text-left border-b-2 border-teal-300">Customer</th>
                                    <th className="p-4 text-white font-bold text-left border-b-2 border-teal-300">Order Item</th>
                                    <th className="p-4 text-white font-bold text-left border-b-2 border-teal-300">Amount</th>
                                    <th className="p-4 text-white font-bold text-left border-b-2 border-teal-300">Date & Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((o, index) => (
                                    <tr key={o._id || `order-${index}`} className="border-t border-gray-200 hover:bg-teal-50 transition-colors duration-200">
                                        <td className="p-4 text-gray-800">{o.userId?.email}</td>
                                        <td className="p-4 text-gray-800 font-semibold">{o.productId?.name}</td>
                                        <td className="p-4 text-lg font-bold text-teal-600">${o.totalAmount}</td>
                                        <td className="p-4 text-gray-700">{new Date(o.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
