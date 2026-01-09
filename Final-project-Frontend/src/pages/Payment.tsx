import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Payment: React.FC = () => {
    const { state }: any = useLocation();
    const { product, selectedAlcohol } = state || {};
    const [card, setCard] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const navigate = useNavigate();
    const [err, setErr] = useState<string | null>(null);

    if (!product) return <div className="p-4">No product selected</div>;

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        try {
            const res = await API.post('/orders', {
                productId: product.id,
                category: product.category,
                selectedAlcohol: selectedAlcohol || null,
                totalAmount: product.price || 5.99 // if no price saved, use sample amount
            });
            navigate('/slip', { state: { order: res.data } });
        } catch (e:any) {
            setErr(e.response?.data?.message || 'Payment failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-2">💳 Payment</h2>
                        <p className="text-amber-100 text-sm">Complete your order</p>
                    </div>
                    
                    {/* Order Details */}
                    <div className="px-8 py-6 bg-amber-50 border-b border-amber-100">
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-1">Order Item</p>
                            <p className="text-lg font-bold text-gray-800">{product.name}</p>
                        </div>
                        {product.price && (
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                <p className="text-3xl font-bold text-amber-600">${product.price.toFixed(2)}</p>
                            </div>
                        )}
                    </div>

                    {/* Payment Form */}
                    <div className="px-8 py-8">
                        {err && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
                                <p className="font-semibold text-sm">{err}</p>
                            </div>
                        )}
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                                <input 
                                    value={card} 
                                    onChange={e=>setCard(e.target.value)} 
                                    placeholder="1234 5678 9012 3456"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 transition-all duration-200" 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry</label>
                                    <input 
                                        value={expiry} 
                                        onChange={e=>setExpiry(e.target.value)} 
                                        placeholder="MM/YY"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 transition-all duration-200" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                                    <input 
                                        value={cvv} 
                                        onChange={e=>setCvv(e.target.value)} 
                                        placeholder="123"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 transition-all duration-200" 
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-6"
                            >
                                Pay ${product.price?.toFixed(2)}
                            </button>
                            <p className="text-center text-gray-600 text-xs">🔒 Secure payment • Your card details are encrypted</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
