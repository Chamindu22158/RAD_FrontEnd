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
        <div className="p-6 max-w-md mx-auto mt-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-4 border-purple-500/30 p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Payment</h2>
                <p className="text-lg text-gray-300 mb-2">Product: <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{product.name}</span></p>
                {product.price && (
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">Total: ${product.price.toFixed(2)}</p>
                )}
                {err && <div className="bg-red-900/50 text-red-300 p-3 mb-4 rounded-lg border-2 border-red-500/50">{err}</div>}
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <input value={card} onChange={e=>setCard(e.target.value)} placeholder="Card number" className="border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
                    <input value={expiry} onChange={e=>setExpiry(e.target.value)} placeholder="MM/YY" className="border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
                    <input value={cvv} onChange={e=>setCvv(e.target.value)} placeholder="CVV" className="border-2 border-purple-500/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white placeholder-gray-400" />
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">Pay Now</button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
