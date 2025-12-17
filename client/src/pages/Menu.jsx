import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"; 
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import MenuGrid from "../components/MenuGrid";
import Footer from "../components/Footer";
import { FaFilter, FaUndo, FaStar, FaSortAmountDown } from 'react-icons/fa';

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- ENHANCED FILTER STATES ---
    const [selectedCategory, setSelectedCategory] = useState('All'); 
    const [maxPrice, setMaxPrice] = useState(10000); 
    const [maxCalories, setMaxCalories] = useState(2000);
    const [minRating, setMinRating] = useState(0);
    const [onlyPopular, setOnlyPopular] = useState(false);
    const [sortBy, setSortBy] = useState('default');

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/menu'); 
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setMenuItems(data); 
        } catch (e) {
            console.error("Could not fetch menu items:", e);
            setError("Failed to load menu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMenuItems(); }, []);

    const resetFilters = () => {
        setSelectedCategory('All');
        setMaxPrice(10000);
        setMaxCalories(2000);
        setMinRating(0);
        setOnlyPopular(false);
        setSortBy('default');
    };

    // --- ADVANCED FILTERING & SORTING LOGIC ---
    let filteredItems = menuItems.filter(item => {
        const itemCatName = typeof item.category === 'object' ? item.category?.name : item.category;
        const matchesCategory = selectedCategory === 'All' || (itemCatName && itemCatName.toLowerCase().trim() === selectedCategory.toLowerCase().trim());
        const matchesPrice = Number(item.price) <= maxPrice;
        const matchesCalories = !item.calories || Number(item.calories) <= maxCalories;
        const matchesRating = (item.rating || 0) >= minRating;
        const matchesPopular = onlyPopular ? item.isPopular : true;

        return matchesCategory && matchesPrice && matchesCalories && matchesRating && matchesPopular;
    });

    // Sorting logic
    if (sortBy === 'priceLow') filteredItems.sort((a, b) => a.price - b.price);
    if (sortBy === 'priceHigh') filteredItems.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') filteredItems.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    if (loading) return <div className="min-h-screen pt-28 text-center">Loading...</div>;

    return (
    <div className="min-h-screen flex flex-col bg-gray-50"> 
        <Navbar />
        
        {/* Main Content Wrapper */}
        <div className="pt-20"> 
            {/* 1. Hero Section - Usually full width or matched width */}
            <Hero />

            {/* 2. Content Container - This creates the left/right "gutters" */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8">
                
                {/* 3. Horizontal Categories (Top) */}
                <div className="mb-10">
                    <Categories 
                        onCategoryChange={setSelectedCategory} 
                        activeCategory={selectedCategory} 
                        menuItems={menuItems} 
                    />
                </div>

                {/* 4. Flex Layout for Sidebar + Grid */}
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Left Sidebar - Fixed Width */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-white p-6 rounded-3xl shadow-sm sticky top-28 border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                                    <FaFilter className="text-orange-500" size={18} /> Filters
                                </h2>
                                <button 
                                    onClick={resetFilters} 
                                    className="text-sm text-orange-500 font-semibold hover:text-orange-600 transition flex items-center gap-1"
                                >
                                    <FaUndo size={12} /> Reset
                                </button>
                            </div>

                            {/* SORT BY */}
                            <div className="mb-10">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Sort By</label>
                                <select 
                                    value={sortBy} 
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                >
                                    <option value="default">Recommended</option>
                                    <option value="priceLow">Price: Low to High</option>
                                    <option value="priceHigh">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>

                            {/* PRICE SLIDER */}
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Max Price</label>
                                    <span className="text-sm font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">LKR {maxPrice}</span>
                                </div>
                                <input 
                                    type="range" min="0" max="10000" step="100" 
                                    value={maxPrice} 
                                    onChange={(e) => setMaxPrice(Number(e.target.value))} 
                                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none accent-orange-500 cursor-pointer" 
                                />
                            </div>

                            {/* RATING BUTTONS */}
                            <div className="mb-10">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Customer Rating</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[3, 4, 5].map((star) => (
                                        <button 
                                            key={star}
                                            onClick={() => setMinRating(star)}
                                            className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                                                minRating === star 
                                                ? 'bg-orange-500 border-orange-500 text-white shadow-md' 
                                                : 'bg-white border-gray-100 text-gray-500 hover:border-orange-200'
                                            }`}
                                        >
                                            {star}+ <FaStar className="inline mb-0.5 ml-0.5" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* POPULAR TOGGLE */}
                            <div className="pt-6 border-t border-gray-50">
                                <label className="relative flex items-center justify-between cursor-pointer group">
                                    <span className="text-sm font-bold text-gray-700 group-hover:text-orange-600 transition">Popular Items Only</span>
                                    <div className="relative">
                                        <input type="checkbox" checked={onlyPopular} onChange={() => setOnlyPopular(!onlyPopular)} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 shadow-inner"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </aside>

                    {/* Right Side - Grid Area */}
                    <main className="flex-grow">
                        <MenuGrid items={filteredItems} />
                        
                        {/* Empty State */}
                        {filteredItems.length === 0 && (
                            <div className="text-center py-32 bg-white rounded-[40px] border border-gray-100 mt-4">
                                <div className="text-5xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-gray-800">No matching flavors</h3>
                                <p className="text-gray-400 mt-2">Try adjusting your filters to find more dishes.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);
}