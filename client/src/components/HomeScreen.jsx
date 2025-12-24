import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUtensils, FaAward, FaCalendarAlt, FaHighlighter, FaStar } from 'react-icons/fa';

const HomeScreen = () => {
    return (
        <section className="relative h-[807px] flex items-center overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070')` 
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-orange-900/60 to-orange-600/40 z-1"></div>

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                
                {/* Left Side Content */}
                <div className="text-white space-y-6">
                    <div className="inline-block bg-orange-500/20 border border-orange-500/30 px-4 py-1 rounded-full text-xs font-semibold text-orange-200">
                        🎉 Free takeaway on orders over LKR 3000
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                        Elevate Your <br />Cravings with <br></br><span className="text-orange-500">Every Bite</span>
                    </h1>
                    
                    <p className="text-gray-300 text-lg max-w-lg">
                        Order your favorite meals from Flavor Town and enjoy restaurant-quality food. 
                        We bring the best of the Flavor Town’s curated menu. 
                    </p>

                    <div className="flex space-x-4 pt-4">
                        <Link 
                            to="/menu" 
                            className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition shadow-lg flex items-center group"
                        >
                            Order Now <span className="ml-2 group-hover:translate-x-1 transition">→</span>
                        </Link>
                        <Link 
                            to="/menu" 
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition"
                        >
                            View Menu
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
    {/* Card 1 */}
    <div className="bg-orange-600/80 backdrop-blur-md p-6 rounded-3xl text-white">
        <FaUsers className="text-3xl mb-3 text-orange-200" />
        <h3 className="text-2xl font-bold">10K+</h3>
        <p className="text-orange-100 text-sm">Happy Customers</p>
    </div>
    
    {/* Card 2 */}
    <div className="bg-orange-600/80 backdrop-blur-md p-6 rounded-3xl text-white">
        <FaUtensils className="text-3xl mb-3 text-orange-100" />
        <h3 className="text-2xl font-bold">200+</h3>
        <p className="text-orange-100 text-sm">Menu Items</p>
    </div>

    {/* Card 3 */}
    <div className="bg-orange-600/80 backdrop-blur-md p-6 rounded-3xl text-white">
        <FaAward className="text-3xl mb-3 text-orange-100" />
        <h3 className="text-2xl font-bold">15+</h3>
        <p className="text-orange-100 text-sm">Awards Won</p>
    </div>

    {/* Card 4 */}
    <div className="bg-orange-600/80 backdrop-blur-md p-6 rounded-3xl text-white">
        <FaStar className="text-3xl mb-3 text-orange-100" />
        <h3 className="text-2xl font-bold">8+</h3>
        <p className="text-orange-100 text-sm">Years Experience</p>
    </div>
</div>
            </div>
        </section>
    );
};

export default HomeScreen;