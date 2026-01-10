import React, { useState } from 'react';

interface Props { product: any; onClick: (p: any) => void; }
export const ProductCard: React.FC<Props> = ({ product, onClick }) => {
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = () => {
        setImageError(true);
    };
    
    return (
        <div 
            className="bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-violet-100 hover:border-violet-300 group"
            onClick={() => onClick(product)}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 h-48">
                <img 
                    src={imageError ? 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop' : product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    onError={handleImageError}
                />
                {product.category === 'juice' && (
                    <div className="absolute top-3 right-3 bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Main</div>
                )}
                {product.category === 'cocktail' && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Beverage</div>
                )}
                {product.category === 'custom' && (
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Appetizer</div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    {product.price && (
                        <p className="text-2xl font-bold text-violet-600">${product.price.toFixed(2)}</p>
                    )}
                    <span className="text-violet-600 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
            </div>
        </div>
    );
};
