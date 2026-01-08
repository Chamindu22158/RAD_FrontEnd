import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Search products..." }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full max-w-md px-4 py-3 border-2 border-purple-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-gray-800/50 text-white placeholder-gray-400 shadow-lg backdrop-blur-sm"
            />
        </div>
    );
};

export default SearchInput;

