import React, { useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import ItemModal from "./ItemModal"; 
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from "../context/CartContext"; 

export default function MenuGrid({ items }) {
    const { addToCart } = useCart(); 
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const handleAddToCart = (item, quantity = 1) => {
        addToCart(item, quantity); 
        toast.success(`${quantity}x ${item.name} added to cart!`);
        handleCloseModal();
    };

    if (items.length === 0) {
        return (
            <section className="px-8 mt-8">
                <p className="text-gray-500 text-center py-10 text-lg">
                    No items found in this category.
                </p>
            </section>
        );
    }

    return (
        <div className="container mx-auto">
            <Toaster />
            {/* CHANGE: Added xl:grid-cols-5 to ensure 5 items per row */}
            <section className="px-0 mt-2 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {items.map((item) => (
                    <div
                        key={item._id}
                        onClick={() => handleOpenModal(item)} 
                        className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:ring-2 hover:ring-orange-500 cursor-pointer relative group"
                    >
                        {item.isPopular && (
                            <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                                <FaStar className="w-3 h-3 text-white" />
                                Popular
                            </div>
                        )}

                        <div className="h-40 w-full overflow-hidden rounded-t-xl">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover transform group-hover:scale-105 transition duration-500"
                            />
                        </div>

                        <div className="p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-base">{item.name}</h3>
                                <p className="text-gray-500 text-xs mt-1 leading-normal mb-3 line-clamp-2">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <p className="text-orange-600 font-bold text-">
                                    LKR {item.price}
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        handleAddToCart(item); 
                                    }}
                                    className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition duration-150"
                                >
                                    <FaPlus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {selectedItem && (
                <ItemModal
                    item={{
                        ...selectedItem,
                        price: `LKR ${selectedItem.price}`,
                        img: selectedItem.image 
                    }}
                    onClose={handleCloseModal}
                    onAddToCart={handleAddToCart} 
                />
            )}
        </div>
    );
}