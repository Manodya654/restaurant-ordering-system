import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (id) => {
    setCartItems((prev) => {
        const updatedCart = prev.filter((item) => item._id !== id);
        // We save to localStorage immediately so the change persists
        localStorage.setItem('flavorTownCart', JSON.stringify(updatedCart));
        return updatedCart;
    });
};

  // Load cart from local storage on startup so it doesn't disappear on refresh
  useEffect(() => {
    const savedCart = localStorage.getItem('flavorTownCart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('flavorTownCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const clearCart = () => setCartItems([]);
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount, clearCart, removeFromCart }}>
        {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);