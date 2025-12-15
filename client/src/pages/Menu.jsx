import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"; 
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import MenuGrid from "../components/MenuGrid";
import Footer from "../components/Footer";

export default function Menu() {
    // 1. State to hold the fetched menu items
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All'); 

    // 2. Function to fetch data from the backend
    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/items'); 
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setMenuItems(data); 
            
            // Debugging: Log the categories found in the database to the console
            console.log("Loaded items:", data);
        } catch (e) {
            console.error("Could not fetch menu items:", e);
            setError("Failed to load menu. Please check the server connection.");
        } finally {
            setLoading(false);
        }
    };

    // 3. useEffect hook to run the fetch once when the component loads
    useEffect(() => {
        fetchMenuItems();
    }, []);

    // 4. Filtering Logic (Improved)
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Robust filtering: Converts everything to lowercase before comparing
    const filteredItems = menuItems.filter(item => {
        if (selectedCategory === 'All') return true;

        // Safety check: ensure item.category exists
        if (!item.category) return false;

        // Compare lowercase versions to avoid "Burger" vs "burger" issues
        return item.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
    });

    // --- Conditional Rendering for Loading and Error States ---
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col pt-28"> 
                <Navbar />
                <div className="flex-grow max-w-7xl mx-auto w-full px-6 py-20 text-center text-xl text-gray-600">
                    Loading delicious items...
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col pt-28"> 
                <Navbar />
                <div className="flex-grow max-w-7xl mx-auto w-full px-6 py-20 text-center text-xl text-red-600">
                    {error}
                </div>
                <Footer />
            </div>
        );
    }

    // --- Main Render Section ---
    return (
        <div className="min-h-screen flex flex-col"> 
            <Navbar />
            
            {/* Kept pt-28 to ensure Navbar doesn't cover content */}
            <div className="flex-grow pt-20"> 
                
                <div className="mb-1"> 
                    <Hero />
                </div>

                <div className="max-w-7xl mx-auto w-full py-6">
                    
                    {/* Pass the filtering function and current state */}
                    <Categories 
                        onCategoryChange={handleCategoryChange} 
                        activeCategory={selectedCategory} 
                        menuItems={menuItems} 
                    />
                    
                    {/* Display the filtered results */}
                    <MenuGrid items={filteredItems} /> 
                    
                    {/* Helpful message if filter returns nothing */}
                    {filteredItems.length === 0 && (
                        <div className="text-center text-gray-500 mt-10">
                            No items found in the "{selectedCategory}" category.
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}