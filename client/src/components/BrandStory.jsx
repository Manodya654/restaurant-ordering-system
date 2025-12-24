import { Star, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BrandStory = () => {

  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Parallax-style Background */}
      <div 
        className="absolute inset-0 z-0 scale-110"
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255, 247, 237, 0.9), rgba(255, 247, 237, 0.7)), url(https://cdn.pixabay.com/photo/2015/09/14/11/43/restaurant-939435_1280.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 items-center gap-12">
          
          {/* Left Side: Image / Visual element */}
          <div className="relative group hidden md:block">
            <div className="absolute -inset-4 bg-orange-500/10 rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            <img 
              src="https://images.pexels.com/photos/5229768/pexels-photo-5229768.jpeg?_gl=1*1fvin5a*_ga*MTAxNjU1MDYzNC4xNzY0NzQ3NjM4*_ga_8JE65Q40S6*czE3NjY1OTY5MjYkbzkkZzEkdDE3NjY1OTcxMTUkajE5JGwwJGgw" 
              alt="Our Kitchen" 
              className="relative rounded-[2.5rem] shadow-2xl border-4 border-white object-cover h-[400px] w-full"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-orange-100 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-orange-500 p-3 rounded-2xl text-white">
                <Star fill="white" size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 leading-none">4.9/5</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-black uppercase tracking-widest">
              <Heart size={14} fill="currentColor" /> Our Heritage
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              A Taste of <span className="text-orange-500 italic">Flavor Town</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Since <span className="text-gray-900 font-bold border-b-2 border-orange-500">2017</span>, 
              we've been on a mission to ignite your senses with fresh ingredients and 
              bold, unforgettable combinations that keep you coming back for more.
            </p>

            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-start gap-3">
                  <div className="text-orange-500 mt-1"><Clock size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Always Fresh</h4>
                    <p className="text-sm text-gray-500">Sourced daily from local farms.</p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <div className="text-orange-500 mt-1"><Star size={20} /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Chef Specials</h4>
                    <p className="text-sm text-gray-500">Unique recipes you won't find anywhere.</p>
                  </div>
               </div>
            </div>

            <button 
      onClick={() => navigate('/about')}
      className="px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95"
    >
      Read Our Full Story
    </button>

            
          </div>
        </div>
      </div>

      {/* Custom Styles for the Badge Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}} />
    </section>
  );
};

export default BrandStory;