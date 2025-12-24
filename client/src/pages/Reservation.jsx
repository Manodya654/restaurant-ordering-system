import React, { useState } from 'react';
import { Calendar, Users, Clock, MessageSquare, Utensils, Phone, Star } from 'lucide-react';
import heroImage from "../assets/hero.jpg"; 
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Reservation = () => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    requests: ''
  });

  const timeSlots = [
    "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", 
    "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reservation logic here
    console.log("Reservation Submitted:", bookingData);
    alert("Thank you! Your reservation request has been sent.");
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      <Navbar/>
      {/* Hero Header */}
      <div className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        <div className="relative text-center z-10 px-4">
          <h1 className="text-5xl font-black text-white mb-4">Make a <span className="text-orange-500">Reservation</span></h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Reserve your spot at Flavor Town and enjoy an exquisite culinary journey prepared by our master chefs.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 pb-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Reservation Form */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-orange-900/5 p-8 md:p-12 border border-orange-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Basics */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">1</span>
                  Select Date & Party Size
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
                      <input 
                        type="date" 
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-[#FFF7ED]/50 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
                      <select 
                        className="w-full pl-12 pr-4 py-3.5 bg-[#FFF7ED]/50 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                        value={bookingData.guests}
                        onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                      >
                        {[1,2,3,4,5,6,7,8,10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Time Selection */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2</span>
                  Choose Preferred Time
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setBookingData({...bookingData, time: time})}
                      className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                        bookingData.time === time 
                        ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200' 
                        : 'bg-white text-gray-600 border-orange-100 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">3</span>
                  Contact Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    className="w-full px-5 py-3.5 bg-[#FFF7ED]/50 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    className="w-full px-5 py-3.5 bg-[#FFF7ED]/50 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  />
                </div>
                <textarea 
                  placeholder="Any special requests? (e.g., Birthday, window seat, allergies)"
                  rows="4"
                  className="w-full px-5 py-3.5 bg-[#FFF7ED]/50 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  onChange={(e) => setBookingData({...bookingData, requests: e.target.value})}
                ></textarea>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-95 text-lg uppercase tracking-wider">
                Confirm Booking
              </button>
            </form>
          </div>

          {/* Right Column: Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-orange-600 rounded-[2.5rem] p-8 text-white shadow-xl">
              <h4 className="text-2xl font-bold mb-6">Visit Us</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-orange-500 p-3 rounded-2xl h-fit">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-orange-200 text-xs font-bold uppercase tracking-widest mb-1">Call for support</p>
                    <p className="text-lg font-bold">+94 11 234 5678</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-orange-500 p-3 rounded-2xl h-fit">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <p className="text-orange-200 text-xs font-bold uppercase tracking-widest mb-1">Opening Hours</p>
                    <p className="text-sm font-bold">Mon - Fri: 11 AM - 11 PM</p>
                    <p className="text-sm font-bold">Sat - Sun: 10 AM - 12 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-orange-100 shadow-sm">
              <div className="flex items-center gap-1 mb-4 text-orange-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-gray-600 italic mb-4">
                "The atmosphere is incredible and the grill flavors are like nothing I've had before. Highly recommend the window seats for dinner!"
              </p>
              <p className="text-sm font-bold text-gray-900">— Sarah J.</p>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Reservation;