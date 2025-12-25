import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"; 
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import MenuGrid from "../components/MenuGrid";
import Footer from "../components/Footer";
import { FaFilter, FaStar, FaUtensils } from 'react-icons/fa';

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All'); 
    const [maxPrice, setMaxPrice] = useState(10000); 
    const [minRating, setMinRating] = useState(0);
    const [onlyPopular, setOnlyPopular] = useState(false);
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/menu'); 
                const data = await response.json();
                setMenuItems(data); 
            } catch (e) { console.error(e); } finally { setLoading(false); }
        };
        fetchMenuItems();
    }, []);

    const resetFilters = () => {
        setSelectedCategory('All');
        setMaxPrice(10000);
        setMinRating(0);
        setOnlyPopular(false);
        setSortBy('default');
    };

    let filteredItems = menuItems.filter(item => {
        const itemCatName = typeof item.category === 'object' ? item.category?.name : item.category;
        const matchesCategory = selectedCategory === 'All' || itemCatName?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesPrice = Number(item.price) <= maxPrice;
        const matchesRating = (item.rating || 0) >= minRating;
        const matchesPopular = onlyPopular ? item.isPopular : true;
        return matchesCategory && matchesPrice && matchesRating && matchesPopular;
    });

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF7ED]">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-orange-600 font-bold tracking-widest uppercase text-xs">Flavor Town is loading...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-[#FFF7ED]"> 
            <Navbar />
            <div className="pt-20"> 
                <Hero />

                <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-orange-100/30 overflow-hidden">
                        
                        {/* CATEGORY SECTION */}
                        <div className="px-10 pt-10 pb-6 border-b border-gray-50">
                             <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">Browse Categories</h2>
                             <Categories 
                                menuItems={menuItems}
                                onCategoryChange={setSelectedCategory} 
                                activeCategory={selectedCategory} 
                            />
                        </div>

                        <div className="flex flex-col lg:flex-row">
                            {/* SIDEBAR */}
                            {/* Unified Sidebar Filter Section */}
<aside className="w-full lg:w-72 p-8 border-r border-gray-50 bg-gray-50/10">
    <div className="sticky top-28 space-y-12"> {/* Increased space-y for better breathing room */}
        
        {/* Header Section */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                <FaFilter className="text-orange-500" size={16} /> Filters
            </h2>
            <button 
                onClick={resetFilters} 
                className="text-[11px] font-bold text-orange-500 hover:text-orange-600 uppercase tracking-widest transition-colors"
            >
                Reset
            </button>
        </div>

        {/* Sort Selection */}
        <div className="space-y-">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                Sort By
            </label>
            <div className="relative">
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-4 focus:ring-orange-500/5 outline-none appearance-none transition-all cursor-pointer"
                >
                    <option value="default">Recommended</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                </select>
                {/* Custom arrow for the select box */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
        </div>

        {/* Customer Rating Filter */}
        <div className="space-y-4">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                Customer Rating
            </label>
            <div className="flex justify-between gap-2">
                {[3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setMinRating(star === minRating ? 0 : star)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border font-bold text-xs transition-all ${
                            minRating === star 
                            ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200' 
                            : 'bg-white border-gray-100 text-gray-500 hover:border-orange-200'
                        }`}
                    >
                        {star} <FaStar size={10} className={minRating === star ? 'text-white' : 'text-orange-400'} />
                    </button>
                ))}
            </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Max Price
                </label>
                <span className="text-sm font-black text-orange-600">LKR {maxPrice}</span>
            </div>
            <div className="px-1">
                <input 
                    type="range" 
                    min="0" 
                    max="10000" 
                    step="100" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(Number(e.target.value))} 
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-500 transition-all hover:h-2" 
                />
            </div>
        </div>

        {/* Popularity Toggle */}
        <div className="pt-8 border-t border-gray-50">
            <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Popular Only</span>
                <div className="relative">
                    <input 
                        type="checkbox" 
                        checked={onlyPopular} 
                        onChange={() => setOnlyPopular(!onlyPopular)} 
                        className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </div>
            </label>
        </div>
    </div>
</aside>

                            {/* MAIN GRID */}
                            <main className="flex-grow p-8 lg:p-12">
                                {filteredItems.length > 0 ? (
                                    <MenuGrid items={filteredItems} />
                                ) : (
                                    /* EMPTY STATE */
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                                            <FaUtensils className="text-orange-200" size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">No flavors found</h3>
                                        <p className="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed">
                                            We couldn't find any dishes matching your current filters. Try adjusting your price or category.
                                        </p>
                                        <button 
                                            onClick={resetFilters}
                                            className="mt-8 px-6 py-3 bg-orange-500 text-white rounded-full text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all"
                                        >
                                            Clear All Filters
                                        </button>
                                    </div>
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}