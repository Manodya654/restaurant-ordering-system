import React, { useState } from 'react';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';

// NOTE: You need to ensure your item prop includes category, prepTime, and serves.
export default function ProductModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  
  // Assuming the price in LKR is a string like "LKR 3000"
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
    // Modal Overlay
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4">
      
      {/* Modal Content - Max width to look like the image */}
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition z-10 p-2"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="h-64 w-full overflow-hidden rounded-t-2xl">
          <img 
            src={item.img} 
            alt={item.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Details Section */}
        <div className="p-6">
          
          {/* Title and Price Row */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            {/* Price (LKR 3000 in the image) */}
            <p className="text-xl font-semibold text-orange-600">{item.price}</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-6">{item.description}</p>

          {/* Product Details Table */}
          <h3 className="text-lg font-semibold mb-3">Product Details</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium text-right">{item.category}</span>
            
            <span className="text-gray-500">Preparation Time:</span>
            <span className="font-medium text-right">{item.prepTime || 'N/A'}</span>
            
            <span className="text-gray-500">Serves:</span>
            <span className="font-medium text-right">{item.serves || 'N/A'}</span>
          </div>
          
          {/* Quantity Selector and Total */}
          <div className="flex justify-between items-center py-4 border-t">
            <span className="text-lg font-semibold">Quantity</span>
            
            <div className="flex items-center gap-4">
              {/* Decrease Button */}
              <button 
                onClick={handleDecrease} 
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
              >
                <FaMinus className="w-3 h-3" />
              </button>
              
              {/* Quantity Display */}
              <span className="text-lg font-semibold w-4 text-center">{quantity}</span>
              
              {/* Increase Button */}
              <button 
                onClick={handleIncrease} 
                className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button (Fixed to the bottom in the image design) */}
          <button
            onClick={handleAddToCartClick}
            // Use the prominent orange color from your banner
            className="w-full bg-orange-600 text-white text-lg font-semibold py-3 rounded-xl mt-6 shadow-lg hover:bg-orange-700 transition"
          >
            Add to Cart ({totalDisplay})
          </button>
          
        </div>
      </div>
    </div>
  );
}