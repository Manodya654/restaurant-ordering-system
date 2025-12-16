import { FaClock, FaStar, FaUtensils } from "react-icons/fa"; 
import offerImage from "../assets/offer.jpg"; 

export default function Features() {

  const flashDealImage = `url(${offerImage})`;
    

  const featuresBgImage = flashDealImage; 

  return (

    <section className="mt-12 py-16 relative overflow-hidden text-white">
      

      <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: featuresBgImage }}
      ></div>
 
      <div className="absolute inset-0 bg-orange-600 opacity-70"></div> 
      

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid md:grid-cols-3 gap-12 text-center px-8">
          

          <div className="flex flex-col items-center">

            <FaClock className="w-10 h-10 mb-4" /> 
            
            <h4 className="font-bold text-2xl mb-2">Fast Delivery</h4>
            
            <p className="text-sm max-w-[200px] leading-relaxed">
              Get your food delivered hot and fresh in 30 minutes or less
            </p>
          </div>
          

          <div className="flex flex-col items-center">
            <FaUtensils className="w-10 h-10 mb-4" /> 
            
            <h4 className="font-bold text-2xl mb-2">Wide Selection</h4>
            
            <p className="text-sm max-w-[200px] leading-relaxed">
              Choose from hundreds of dishes across multiple cuisines
            </p>
          </div>
          
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