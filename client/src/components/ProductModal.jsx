import React, { useState } from 'react';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';

export default function ProductModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  
  const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
  const total = priceValue * quantity;
  const totalDisplay = item.price.includes("LKR") 
    ? `LKR ${total.toFixed(2)}` 
    : `$${total.toFixed(2)}`;

  const handleDecrease = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCartClick = () => {
    onAddToCart(item, quantity);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4">
      
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition z-10 p-2"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="h-64 w-full overflow-hidden rounded-t-2xl">
          <img 
            src={item.img} 
            alt={item.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="p-6">
        
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-xl font-semibold text-orange-600">{item.price}</p>
          </div>

          <p className="text-gray-600 text-sm mb-6">{item.description}</p>

          <h3 className="text-lg font-semibold mb-3">Product Details</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium text-right">{item.category}</span>
            
            <span className="text-gray-500">Preparation Time:</span>
            <span className="font-medium text-right">{item.prepTime || 'N/A'}</span>
            
            <span className="text-gray-500">Serves:</span>
            <span className="font-medium text-right">{item.serves || 'N/A'}</span>
          </div>
          
          <div className="flex justify-between items-center py-4 border-t">
            <span className="text-lg font-semibold">Quantity</span>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleDecrease} 
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
              >
                <FaMinus className="w-3 h-3" />
              </button>
              
              <span className="text-lg font-semibold w-4 text-center">{quantity}</span>
              
              <button 
                onClick={handleIncrease} 
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <button
            onClick={handleAddToCartClick}
            className="w-full bg-orange-600 text-white text-lg font-semibold py-3 rounded-xl mt-6 shadow-lg hover:bg-orange-700 transition"
          >
            Add to Cart ({totalDisplay})
          </button>
          
        </div>
      </div>
    </div>
  );
}