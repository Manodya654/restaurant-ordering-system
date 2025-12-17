import React, { useState } from 'react';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';

export default function ItemModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  // Safely handle price: Check if it's already a number or a string that needs cleaning
  const priceValue = typeof item.price === 'number' 
    ? item.price 
    : parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;

  const total = priceValue * quantity;
  
  // Format total for display
  const totalDisplay = `LKR ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity(prev => prev + 1);

  const handleAddToCartClick = () => {
    onAddToCart(item, quantity);
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition z-10 bg-white rounded-full p-2 shadow-sm"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="h-64 w-full overflow-hidden rounded-t-2xl">
          <img 
            src={item.image || item.img} 
            alt={item.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-xl font-semibold text-orange-600">LKR {priceValue}</p>
          </div>

          <p className="text-gray-600 text-sm mb-6">{item.description}</p>

          <h3 className="text-lg font-semibold mb-3">Item Details</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium text-right text-orange-600">
                {item.category?.name || item.category || 'General'}
            </span>
            
            <span className="text-gray-500">Preparation Time:</span>
            <span className="font-medium text-right">{item.prepTime || '10-15 mins'}</span>
            
            <span className="text-gray-500">Calories:</span>
            <span className="font-medium text-right">{item.calories ? `${item.calories} kcal` : 'N/A'}</span>
          </div>
          
          <div className="flex justify-between items-center py-4 border-t">
            <span className="text-lg font-semibold">Quantity</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleDecrease} 
                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
              >
                <FaMinus />
              </button>
              <span className="text-lg font-bold w-4 text-center">{quantity}</span>
              <button 
                onClick={handleIncrease} 
                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCartClick}
            className="w-full bg-orange-500 text-white text-lg font-bold py-4 rounded-xl mt-6 shadow-lg hover:bg-orange-600 transition transform active:scale-95"
          >
            Add to Cart ({totalDisplay})
          </button>
        </div>
      </div>
    </div>
  );
}