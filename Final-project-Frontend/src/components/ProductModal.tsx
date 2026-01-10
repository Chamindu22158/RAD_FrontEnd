import React from 'react';



interface Props { product: any; onClose: ()=>void; onBuy: ()=>void; onSelectAlcohol?: (a:string)=>void }
const ProductModal: React.FC<Props> = ({ product, onClose, onBuy, onSelectAlcohol }) => {
    if (!product) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-violet-100 overflow-hidden relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 transition-colors z-10"
                >
                    ×
                </button>

                <div className="bg-gradient-to-r from-blue-600 to-blue-600 p-8 text-white">
                    <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                    {product.price && (
                        <p className="text-4xl font-bold text-violet-100">${product.price.toFixed(2)}</p>
                    )}
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                        <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Ingredients</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{product.ingredients?.join(', ')}</p>
                    </div>

                    {product.alcoholBrands?.length > 0 && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Add-ons / Extras</label>
                            <select 
                                onChange={(e)=>onSelectAlcohol && onSelectAlcohol(e.target.value)} 
                                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-800 transition-all duration-200"
                            >
                                <option value="" className="bg-white text-gray-800">-- Select Add-on --</option>
                                {product.alcoholBrands.map((b:string)=> <option key={b} value={b} className="bg-white text-gray-800">{b}</option>)}
                            </select>
                            <p className="text-xs text-gray-600 mt-2">Optional: Choose any add-ons to customize your order</p>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 p-6 bg-gray-50 border-t border-gray-200">
                    <button 
                        onClick={onClose} 
                        className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
                    >
                        Close
                    </button>
                    <button 
                        onClick={onBuy} 
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
