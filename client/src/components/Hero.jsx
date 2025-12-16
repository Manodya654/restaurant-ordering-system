import heroImage from "../assets/hero.jpg"; 
import offerImage from "../assets/offer.jpg"; 

export default function Hero() {
    
    const mainBannerImage = `url(${heroImage})`; 
    const flashDealImage = `url(${offerImage})`;

    return (
        <section className="max-w-7xl mx-auto w-full px-6 pt-8">
            
            <div className="grid md:grid-cols-3 gap-6">
                
                <div 
                    className="md:col-span-2 text-white rounded-2xl relative overflow-hidden"
                    style={{ height: '20rem' }} 
                >
                    
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: mainBannerImage }}
                    ></div>
                    
                    <div className="absolute inset-0 bg-orange-600 opacity-75"></div> 
                    
                    <div className="relative z-10 p-8 py-10 flex flex-col justify-center h-full"> 
                        <h2 className="text-4xl font-extrabold mb-4">
                            Hungry? We're firing up the grill.
                        </h2>
                        <p className="text-lg mb-6 max-w-sm">
                            Order your favorites and take them hot and fresh.
                        </p>
                        <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold text-base shadow-md w-fit">
                            Order Now
                        </button>
                    </div>
                </div>

                <div 
                    className="bg-black text-white rounded-2xl relative overflow-hidden"
                    style={{ height: '20rem' }} 
                >
                    
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: flashDealImage }}>
                    </div>
                    
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    
                    <div className="relative z-10 p-6 flex flex-col justify-center h-full">
                        <h3 className="text-xl font-bold mb-3">FLASH DEAL 🔥</h3>
                        <p className="text-sm">
                            Buy Spicy Fries with Combo – 30% off
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}