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
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">Admin Panel</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="lg:col-span-1">
                    <AdminProductForm onCreated={fetchAll} />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-4 border-purple-500/30 p-6">
                        <h3 className="text-2xl font-bold text-white mb-4">Products</h3>
                        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search products by name, description, or ingredients..." />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {products.map((p, index) => (
                                <div key={p.id || `product-${index}`} className="bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-purple-500/30 p-4 rounded-lg shadow-lg hover:shadow-purple-500/25 hover:border-purple-400/50 transition-all duration-300">
                                    <img 
                                        src={imageErrors.has(p.id) ? 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop' : p.image} 
                                        alt={p.name} 
                                        className="h-36 w-full object-cover rounded-lg" 
                                        onError={() => handleImageError(p.id)}
                                    />
                                    <div className="mt-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-white">{p.name}</h4>
                                                <p className="text-sm text-gray-400">{p.category}</p>
                                                {p.isFamous && <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded font-semibold mt-1 inline-block">⭐ Famous</span>}
                                            </div>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={()=>handleToggleFamous(p.id, p.isFamous || false)} 
                                                    className={`px-3 py-1 rounded-lg text-white font-semibold transition-all duration-300 ${p.isFamous ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'}`}
                                                >
                                                    {p.isFamous ? '⭐' : '⭐'}
                                                </button>
                                                <button onClick={()=>handleDelete(p.id)} className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300">Delete</button>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t-2 border-purple-500/30">
                                            <label className="block text-sm font-semibold text-purple-300 mb-1">Price ($)</label>
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
                                                    className="flex-1 border-2 border-purple-500/50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-4 border-purple-500/30 p-6">
                        <h3 className="text-2xl font-bold text-white mb-4">Orders</h3>
                        <div className="mt-2 overflow-x-auto">
                            <table className="w-full table-auto border-2 border-purple-500/30">
                                <thead className="bg-gradient-to-r from-purple-600 to-pink-600">
                                <tr>
                                    <th className="p-3 border-2 border-purple-500/50 text-white font-bold">User</th>
                                    <th className="p-3 border-2 border-purple-500/50 text-white font-bold">Product</th>
                                    <th className="p-3 border-2 border-purple-500/50 text-white font-bold">Amount</th>
                                    <th className="p-3 border-2 border-purple-500/50 text-white font-bold">Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((o, index) => (
                                    <tr key={o._id || `order-${index}`} className="border-t-2 border-purple-500/30 hover:bg-purple-900/20 transition-colors">
                                        <td className="p-3 border-2 border-purple-500/30 text-white">{o.userId?.email}</td>
                                        <td className="p-3 border-2 border-purple-500/30 text-white font-semibold">{o.productId?.name}</td>
                                        <td className="p-3 border-2 border-purple-500/30 text-white font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">${o.totalAmount}</td>
                                        <td className="p-3 border-2 border-purple-500/30 text-white">{new Date(o.createdAt).toLocaleString()}</td>
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
