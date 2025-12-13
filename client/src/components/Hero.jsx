import heroImage from "../assets/hero.jpg"; // Adjust path if needed
import offerImage from "../assets/offer.jpg"; // Adjust path if needed

export default function Hero() {
    
  // Placeholder image URLs - REPLACE THESE WITH YOUR ACTUAL IMAGE PATHS
  const mainBannerImage = `url(${heroImage})`; 
  const flashDealImage = `url(${offerImage})`;

  return (
    <section className="grid md:grid-cols-3 gap-8 px-8 mt-6">
      
      {/* 1. Main Banner (Orange with Burger/Kitchen Image) */}
      <div 
        className="md:col-span-2 text-white rounded-2xl relative overflow-hidden"
        // INCREASED HEIGHT: h-72 (adjust as needed)
        // BACKGROUND IMAGE: Using inline style for the image
        style={{ height: '18rem' }} // h-72 is 18rem
      >
        
        {/* Background Image Container */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: mainBannerImage }}
        ></div>
        
        {/* Opacity Overlay (Orange with 60% opacity) */}
        <div className="absolute inset-0 bg-orange-600 opacity-75"></div> 
        
        {/* Content (relative z-index to stay above the image/overlay) */}
        <div className="relative z-10 p-8 flex flex-col justify-center h-full">
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

      {/* 2. Side Deal (Black with Fries/Combo Image) */}
      <div 
        className="bg-black text-white rounded-2xl relative overflow-hidden"
        // INCREASED HEIGHT: h-72 (to match the main banner)
        style={{ height: '18rem' }} // h-72 is 18rem
      >
        
        {/* Background Image Container */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: flashDealImage }}
        ></div>
        
        {/* Opacity Overlay (Black with 80% opacity) */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        {/* Content (relative z-index to stay above the image/overlay) */}
        <div className="relative z-10 p-6 flex flex-col justify-center h-80%">
          <h3 className="text-xl font-bold mb-3">FLASH DEAL 🔥</h3>
          <p className="text-sm">
            Buy Spicy Fries with Combo – 30% off
          </p>
        </div>
      </div>
    </section>
  );
}