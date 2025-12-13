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
    const [selectedCategory, setSelectedCategory] = useState('All'); // State for filtering

    // 2. Function to fetch data from the backend
    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/items'); 
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setMenuItems(data); 
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

    // 4. Filtering Logic
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);


    // --- Conditional Rendering for Loading and Error States ---
    // (Ensure these also use the max-width container if they replace the main view)
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
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
            <div className="min-h-screen flex flex-col">
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
            
            {/* The Hero component likely contains the banner shown in the image. 
                If the content is still cut off vertically, you may need to adjust the 
                height or padding INSIDE the Hero component itself. */}
            <Hero />

            {/* --- New Wrapper for horizontal padding and center alignment --- */}
            {/* Added max-w-7xl for width limit, mx-auto for center, and px-6 for padding */}
            <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-10">
                
                {/* Pass the filtering function and currently selected category */}
                <Categories 
                    onCategoryChange={handleCategoryChange} 
                    activeCategory={selectedCategory} 
                    menuItems={menuItems} 
                />
                
                {/* Pass the filtered data to the MenuGrid for display */}
                <MenuGrid items={filteredItems} /> 
            </div>
            
            <Footer />
        </div>
    );
}