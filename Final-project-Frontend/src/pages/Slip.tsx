import React from 'react';
import { useLocation } from 'react-router-dom';

const Slip: React.FC = () => {
    const { state }: any = useLocation();
    const order = state?.order;
    if (!order) return <div className="p-4">No order data</div>;

    return (
        <div className="p-6 max-w-lg mx-auto mt-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border-4 border-purple-500/30 p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 text-center">Payment Slip</h2>
                <div className="space-y-4">
                    <div className="bg-purple-900/30 p-4 rounded-lg border-2 border-purple-500/30">
                        <p className="text-sm text-gray-400">Transaction ID</p>
                        <p className="text-lg font-bold text-white">{order.transactionId}</p>
                    </div>
                    <div className="bg-purple-900/30 p-4 rounded-lg border-2 border-purple-500/30">
                        <p className="text-sm text-gray-400">Product</p>
                        <p className="text-lg font-bold text-white">{order.productId?.name}</p>
                    </div>
                    <div className="bg-purple-900/30 p-4 rounded-lg border-2 border-purple-500/30">
                        <p className="text-sm text-gray-400">Amount</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">${order.totalAmount}</p>
                    </div>
                    <div className="bg-purple-900/30 p-4 rounded-lg border-2 border-purple-500/30">
                        <p className="text-sm text-gray-400">Date</p>
                        <p className="text-lg font-semibold text-white">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slip;
