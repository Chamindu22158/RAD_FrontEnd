import React from 'react';



interface Props { product: any; onClose: ()=>void; onBuy: ()=>void; onSelectAlcohol?: (a:string)=>void }
const ProductModal: React.FC<Props> = ({ product, onClose, onBuy, onSelectAlcohol }) => {
    if (!product) return null;
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-[92%] sm:w-96 rounded-xl shadow-2xl border-4 border-purple-500/50 p-6">
                <h2 className="text-2xl font-bold text-white mb-3">{product.name}</h2>
                {product.price && (
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">${product.price.toFixed(2)}</p>
                )}
                <p className="text-sm mt-2 text-gray-300">{product.description}</p>
                <p className="mt-3 text-sm font-semibold text-purple-300">Ingredients: <span className="font-normal text-gray-400">{product.ingredients?.join(', ')}</span></p>

                {product.alcoholBrands?.length > 0 && (
                    <div className="mt-4">
                        <label className="block mb-2 font-semibold text-purple-300">Choose alcohol</label>
                        <select onChange={(e)=>onSelectAlcohol && onSelectAlcohol(e.target.value)} className="w-full border-2 border-purple-500/50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-700 text-white">
                            <option value="" className="bg-gray-700">-- select --</option>
                            {product.alcoholBrands.map((b:string)=> <option key={b} value={b} className="bg-gray-700">{b}</option>)}
                        </select>
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 border-2 border-gray-500 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition-colors text-gray-300">Close</button>
                    <button onClick={onBuy} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
