import React, { useState } from 'react';

interface Props { product: any; onClick: (p: any) => void; }
export const ProductCard: React.FC<Props> = ({ product, onClick }) => {
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = () => {
        setImageError(true);
    };
    
    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-purple-500/30 rounded-xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 hover:border-purple-400/50" onClick={() => onClick(product)}>
            <img 
                src={imageError ? 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop' : product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover" 
                onError={handleImageError}
            />
            <div className="p-4 bg-gradient-to-b from-gray-800/90 to-purple-900/90 backdrop-blur-sm">
                <h3 className="font-bold text-lg text-white mb-2">{product.name}</h3>
                {product.price && (
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">${product.price.toFixed(2)}</p>
                )}
            </div>
        </div>
    );
};
