import { FaClock, FaStar, FaUtensils } from "react-icons/fa"; // Added FaUtensils and removed unused icons
import offerImage from "../assets/offer.jpg"; 

export default function Features() {

  const flashDealImage = `url(${offerImage})`;
    
  // Placeholder image URL for the background (chefs preparing food)
  // REMINDER: Replace this with the actual path to your image (e.g., from public/assets)
  const featuresBgImage = flashDealImage; 

  return (
    // Outer section: Height/Padding container, set to relative
    <section className="mt-12 py-16 relative overflow-hidden text-white">
      
      {/* 1. Background Image Container */}
      <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: featuresBgImage }}
      ></div>
      
      {/* 2. Opacity Overlay (Orange with 70% opacity to let text shine) */}
      <div className="absolute inset-0 bg-orange-600 opacity-70"></div> 
      
      {/* 3. Content Grid (z-index to be above the image/overlay) */}
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid md:grid-cols-3 gap-12 text-center px-8">
          
          {/* Feature 1: Fast Delivery */}
          <div className="flex flex-col items-center">
            {/* Icon (Larger size, same color as text) */}
            <FaClock className="w-10 h-10 mb-4" /> 
            
            <h4 className="font-bold text-2xl mb-2">Fast Delivery</h4>
            
            <p className="text-sm max-w-[200px] leading-relaxed">
              Get your food delivered hot and fresh in 30 minutes or less
            </p>
          </div>
          
          {/* Feature 2: Wide Selection (Using FaUtensils for the fork/knife icon look) */}
          <div className="flex flex-col items-center">
            <FaUtensils className="w-10 h-10 mb-4" /> 
            
            <h4 className="font-bold text-2xl mb-2">Wide Selection</h4>
            
            <p className="text-sm max-w-[200px] leading-relaxed">
              Choose from hundreds of dishes across multiple cuisines
            </p>
          </div>
          
          {/* Feature 3: Top Quality */}
          <div className="flex flex-col items-center">
            <FaStar className="w-10 h-10 mb-4" /> 
            
            <h4 className="font-bold text-2xl mb-2">Top Quality</h4>
            
            <p className="text-sm max-w-[200px] leading-relaxed">
              Only the finest ingredients in every dish we serve
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}