import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"; 
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import MenuGrid from "../components/MenuGrid";
import Footer from "../components/Footer";
import { FaFilter, FaUndo, FaStar } from 'react-icons/fa';

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

    if (loading) return <div className="min-h-screen pt-28 text-center font-bold text-orange-500 italic">Flavor Town is loading...</div>;

    return (
        <div className="min-h-screen flex flex-col bg-[#FFF7ED]"> 
            <Navbar />
            <div className="pt-20"> 
                <Hero />

                <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10">
                    
                    {/* --- THE MASTER WRAPPER --- */}
                    {/* This container wraps Categories, Filters, and Items together */}
                    <div className="bg-white rounded-[3rem] shadow-xl border border-orange-100/50 overflow-hidden">
                        
                        {/* Top Section: Category Bar (Now inside the white container) */}
                        <div className="px-8 pt-8 pb-4 border-b border-gray-50">
                             <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Browse Categories</h2>
                             <Categories 
                                menuItems={menuItems}
                                onCategoryChange={setSelectedCategory} 
                                activeCategory={selectedCategory} 
                            />
                        </div>

                        {/* Bottom Section: Sidebar + Grid (Side-by-side inside the white container) */}
                        <div className="flex flex-col lg:flex-row min-h-[800px]">
                            
                            {/* Unified Sidebar Filter Section */}
                            <aside className="w-full lg:w-80 p-8 border-r border-gray-50 bg-gray-50/30">
                                <div className="sticky top-28 space-y-10">
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-black text-2xl text-gray-900 flex items-center gap-2">
                                            <FaFilter className="text-orange-500" size={18} /> Filters
                                        </h2>
                                        <button onClick={resetFilters} className="text-xs font-bold text-orange-500 hover:underline">Reset</button>
                                    </div>

                                    {/* Sort Selection */}
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase mb-3">Sort By</label>
                                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none">
                                            <option value="default">Recommended</option>
                                            <option value="priceLow">Price: Low to High</option>
                                            <option value="priceHigh">Price: High to Low</option>
                                        </select>
                                    </div>

                                    {/* Price Slider */}
                                    <div>
                                        <div className="flex justify-between mb-4">
                                            <label className="text-xs font-black text-gray-400 uppercase">Max Price</label>
                                            <span className="text-sm font-black text-orange-600">LKR {maxPrice}</span>
                                        </div>
                                        <input type="range" min="0" max="10000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-orange-500 cursor-pointer" />
                                    </div>

                                    {/* Popularity Toggle */}
                                    <div className="pt-6 border-t border-gray-200/50">
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span className="text-sm font-bold text-gray-700">Popular Items Only</span>
                                            <input type="checkbox" checked={onlyPopular} onChange={() => setOnlyPopular(!onlyPopular)} className="w-5 h-5 accent-orange-500" />
                                        </label>
                                    </div>
                                </div>
                            </aside>

                            {/* Menu Grid Section */}
                            <main className="flex-grow p-8">
                                <MenuGrid items={filteredItems} />
                                {filteredItems.length === 0 && (
                                    <div className="text-center py-20">
                                        <p className="text-gray-400">No dishes match your current filters.</p>
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