import heroImage from "../assets/hero.jpg"; 
import offerImage from "../assets/offer.jpg"; 

export default function Hero() {
    
    const mainBannerImage = `url(${heroImage})`; 
    const flashDealImage = `url(${offerImage})`;

    return (
        <section className="max-w-7xl mx-auto w-full px-6 pt-8">
            
            <div className="grid md:grid-cols-3 gap-6">
                
                {/* Main Interactive Banner */}
                <div 
                    className="md:col-span-2 text-white rounded-2xl relative overflow-hidden group cursor-pointer shadow-lg transition-all duration-500 hover:shadow-orange-200/50"
                    style={{ height: '20rem' }} 
                >
                    {/* Background with Zoom Effect */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: mainBannerImage }}
                    ></div>
                    
                    {/* Overlay with dynamic opacity */}
                    <div className="absolute inset-0 bg-orange-600 opacity-75 group-hover:opacity-70 transition-opacity duration-500"></div> 
                    
                    <div className="relative z-10 p-8 py-10 flex flex-col justify-center h-full"> 
                        <h2 className="text-4xl font-extrabold mb-4 transform transition-all duration-500 group-hover:translate-x-2">
                            Hungry? We're firing up the grill.
                        </h2>
                        <p className="text-lg mb-6 max-w-sm transition-all duration-500 group-hover:translate-x-2 delay-75">
                            Order your favorites and take them hot and fresh.
                        </p>
                        <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold text-base shadow-md w-fit transition-all duration-300 hover:bg-orange-50 hover:scale-105 active:scale-95">
                            Order Now
                        </button>
                    </div>
                </div>

                {/* Animated Flash Deal Card */}
                <div 
                    className="bg-black text-white rounded-2xl relative overflow-hidden group cursor-pointer shadow-lg transition-all duration-500 border-2 border-transparent hover:border-orange-500 animate-pulse-slow"
                    style={{ height: '20rem' }} 
                >
                    {/* Pulsing Border Effect for "Urgency" */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-orange-500/50 animate-ping opacity-0 group-hover:opacity-100 duration-1000"></div>

                    {/* Background with Zoom Effect */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-125"
                        style={{ backgroundImage: flashDealImage }}>
                    </div>
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 p-6 flex flex-col justify-center h-full text-center items-center">
                        <div className="bg-orange-600 text-white text-[10px] font-black px-2 py-1 rounded mb-4 animate-bounce">
                            LIMITED TIME
                        </div>
                        <h3 className="text-2xl font-black mb-3 text-orange-400 group-hover:text-orange-300 transition-colors tracking-tighter">
                            FLASH DEAL 🔥
                        </h3>
                        <p className="text-sm font-medium leading-relaxed max-w-[150px]">
                            Buy Spicy Fries with Combo <br/> 
                            <span className="text-2xl font-bold text-white block mt-2">— 30% off —</span>
                        </p>
                        
                        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <span className="text-xs font-bold underline decoration-orange-500 underline-offset-4">GRAB DEAL NOW</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Added custom CSS for slow pulse in a style tag or global CSS */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.01); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite ease-in-out;
                }
            `}} />
        </section>
    );
}