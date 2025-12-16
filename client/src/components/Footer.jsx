import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-white pt-12 pb-4 text-sm">
      
      <div className="mx-auto max-w-7xl px-8 grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-gray-700 pb-10">
      
        <div className="col-span-2 md:col-span-1">
          <h3 className="logo text-sm font-celtic mb-3 py-2">Flavor Town</h3>
          <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
            Delivering delicious food to your doorstep since 2017. Quality ingredients, fast delivery, unforgettable taste.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-black uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Menu</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Order History</a></li>
          </ul>
        </div>
    
        <div>
          <h4 className="font-bold mb-4 text-black uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-orange-500 transition">Burgers</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Pizza</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Salads</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-black uppercase tracking-wider">Contact Us</h4>
          <ul className="space-y-4 text-gray-600">
            
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 flex-shrink-0 w-4 h-4 text-orange-500" />
              <span>12/ A, Royal street, Colombo.</span>
            </li>
           
            <li className="flex items-center gap-3">
              <FaPhone className="flex-shrink-0 w-4 h-4 text-orange-500" />
              <span>+ 1 5468498710</span>
            </li>
         
            <li className="flex items-center gap-3">
              <FaEnvelope className="flex-shrink-0 w-4 h-4 text-orange-500" />
              <span>hello@flavorstown.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-8 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
      
        <p>© 2025 FlavorTown. All rights reserved.</p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}