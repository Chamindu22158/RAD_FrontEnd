import React from 'react';
import { useLocation } from 'react-router-dom';

const Slip: React.FC = () => {
    const { state }: any = useLocation();
    const order = state?.order;
    if (!order) return <div className="p-4">No order data</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12 text-center">
                        <h1 className="text-5xl mb-2">✓</h1>
                        <h2 className="text-3xl font-bold text-white mb-2">Payment Successful</h2>
                        <p className="text-green-100 text-sm">Order Confirmation</p>
                    </div>

                    {/* Receipt Details */}
                    <div className="px-8 py-8 space-y-4">
                        {/* Transaction ID */}
                        <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-1">Transaction ID</p>
                            <p className="text-lg font-mono font-bold text-gray-800">{order.transactionId}</p>
                        </div>

                        {/* Product */}
                        <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-1">Order Item</p>
                            <p className="text-lg font-bold text-gray-800">{order.productId?.name}</p>
                        </div>

                        {/* Amount */}
                        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-5 rounded-lg border border-amber-300">
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-1">Amount Paid</p>
                            <p className="text-3xl font-bold text-amber-700">${order.totalAmount}</p>
                        </div>

                        {/* Date */}
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                            <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-1">Order Date & Time</p>
                            <p className="text-lg font-semibold text-gray-800">{new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600 mb-4">Thank you for ordering from Gourmet Bistro!</p>
                        <a 
                            href="/" 
                            className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slip;
