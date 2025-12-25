import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Phone, Utensils, Star, CheckCircle2, Info, ArrowLeft } from 'lucide-react';
import axios from 'axios'; 
import heroImage from "../assets/hero.jpg"; 
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Reservation = () => {
  const [selectedFloor, setSelectedFloor] = useState('Ground Floor');
  const [selectedTable, setSelectedTable] = useState(null);
  const [dbTables, setDbTables] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false); // Success state
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    requests: ''
  });

  const timeSlots = [
    "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "4:00 PM",
    "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"
  ];

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tables`, {
          params: { date: bookingData.date, time: bookingData.time }
        });
        setDbTables(response.data);
      } catch (err) { 
        console.error("Error fetching tables", err); 
      }
    };
    fetchTables();
  }, [bookingData.date, bookingData.time]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...bookingData, tableNumber: selectedTable, floor: selectedFloor };
      const response = await axios.post('http://localhost:5000/api/reservations', payload);

      if (response.status === 201) {
        setIsConfirmed(true); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      alert("Reservation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to reset form for a new booking
  const handleNewBooking = () => {
    setIsConfirmed(false);
    setSelectedTable(null);
    setBookingData({
      date: '',
      time: '',
      guests: 2,
      name: '',
      email: '',
      phone: '',
      requests: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      <Navbar/>
      
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        <div className="relative text-center z-10 px-4">
          <h1 className="text-5xl font-black text-white mb-4">Flavor <span className="text-orange-500">Town</span></h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Book your perfect spot for an unforgettable meal.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 pb-20 relative z-20">
        
        {/* CONDITIONAL RENDERING STARTS HERE */}
        {isConfirmed ? (
          <div className="flex justify-center items-center py-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-orange-100 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Reservation Confirmed!</h2>
              <p className="text-gray-600 mb-8">
                We're excited to see you, <strong>{bookingData.name}</strong>! A confirmation email has been sent to {bookingData.email}.
              </p>
              
              <div className="bg-orange-50 rounded-2xl p-6 mb-8 text-left space-y-3 border border-orange-100">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">Your Ticket Details</p>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Table:</span> <span>{selectedTable} ({selectedFloor})</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Date:</span> <span>{bookingData.date}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Time:</span> <span>{bookingData.time}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Party Size:</span> <span>{bookingData.guests} People</span>
                </div>
              </div>
              
              <button 
                onClick={handleNewBooking}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> Make Another Booking
              </button>
            </div>
          </div>
        ) : (
          /* ORIGINAL FORM CONTENT */
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-orange-100">
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Step 1: Date & Guests */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">1</span>
                    Select Date & Party Size
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
                      <input type="date" required className="w-full pl-12 pr-4 py-3.5 bg-orange-50/30 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500" 
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})} />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
                      <select className="w-full pl-12 pr-4 py-3.5 bg-orange-50/30 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 appearance-none font-medium" 
                      value={bookingData.guests} onChange={(e) => {setBookingData({...bookingData, guests: parseInt(e.target.value)}); setSelectedTable(null);}}>
                        {[2, 4, 6, 8, 10].map(num => <option key={num} value={num}>{num} Guests</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 2: Time */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">2</span>
                    Choose Preferred Time
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {timeSlots.map((time) => (
                      <button key={time} type="button" onClick={() => {setBookingData({...bookingData, time}); setSelectedTable(null);}} 
                      className={`py-3 rounded-xl text-sm font-bold border transition-all ${bookingData.time === time ? 'bg-orange-500 text-white border-orange-500 shadow-lg' : 'bg-white text-gray-600 border-orange-100 hover:bg-orange-50'}`}>
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Table Selection */}
                <div className="bg-orange-50/40 p-6 rounded-[2rem] border border-orange-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <span className="bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">3</span>
                      Select Your Table
                    </h3>
                    <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-orange-100 shadow-sm">
                      {["Ground Floor", "First Floor", "Rooftop"].map(f => (
                        <button key={f} type="button" onClick={() => {setSelectedFloor(f); setSelectedTable(null);}} 
                        className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${selectedFloor === f ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-400'}`}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {dbTables.filter(t => t.floor === selectedFloor).map((table) => {
                      const isWrongCapacity = table.capacity < bookingData.guests;
                      const isTaken = table.isReserved; 
                      const isSelected = selectedTable === table.number;

                      return (
                        <button key={table._id} type="button" disabled={isWrongCapacity || isTaken} 
                          onClick={() => setSelectedTable(table.number)} 
                          className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center relative min-h-[100px]
                          ${isSelected ? 'border-orange-500 bg-white shadow-xl scale-105 z-10' : 
                            isTaken ? 'bg-gray-100 opacity-40 cursor-not-allowed border-transparent' : 
                            isWrongCapacity ? 'bg-gray-50 opacity-30 cursor-help border-transparent' : 
                            'bg-white border-transparent hover:border-orange-200 shadow-sm'}
                        `}>
                          {isSelected && <CheckCircle2 className="absolute top-2 right-2 text-orange-500" size={16} />}
                          <span className={`text-lg font-black ${isSelected ? 'text-orange-600' : 'text-gray-800'}`}>{table.number}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{table.capacity} Seater</span>
                          {isTaken && <span className="text-[9px] font-black text-gray-500 mt-1 uppercase">Booked</span>}
                          {isWrongCapacity && <span className="text-[9px] font-black text-red-400 mt-1 uppercase">Too Small</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Contact */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">4</span>
                    Contact Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <input type="text" placeholder="Your Name" required className="w-full px-5 py-3.5 bg-orange-50/30 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-medium" onChange={(e) => setBookingData({...bookingData, name: e.target.value})} />
                    <input type="email" placeholder="Email Address" required className="w-full px-5 py-3.5 bg-orange-50/30 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-medium" onChange={(e) => setBookingData({...bookingData, email: e.target.value})} />
                  </div>
                  <textarea placeholder="Special requests..." rows="3" className="w-full px-5 py-3.5 bg-orange-50/30 border border-orange-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-medium" onChange={(e) => setBookingData({...bookingData, requests: e.target.value})}></textarea>
                </div>

                <button disabled={loading || !selectedTable} className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-black py-6 rounded-2xl shadow-xl transition-all active:scale-95 text-lg uppercase tracking-widest">
                  {loading ? "Processing..." : selectedTable ? `Confirm & Send Confirmation` : "Select a Table to Continue"}
                </button>
              </form>
            </div>

            {/* Sidebar remains visible during form fill */}
            <div className="space-y-6">
              <div className="bg-orange-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-orange-900/20">
                <h4 className="text-2xl font-bold mb-6">Visit Us</h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-orange-500 p-3 rounded-2xl h-fit"><Phone size={20} /></div>
                    <div>
                      <p className="text-orange-200 text-xs font-bold uppercase tracking-widest mb-1">Call for support</p>
                      <p className="text-lg font-bold">+94 11 234 5678</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-orange-500 p-3 rounded-2xl h-fit"><Utensils size={20} /></div>
                    <div>
                      <p className="text-orange-200 text-xs font-bold uppercase tracking-widest mb-1">Opening Hours</p>
                      <p className="text-sm font-bold">Mon - Fri: 11 AM - 11 PM</p>
                      <p className="text-sm font-bold">Sat - Sun: 10 AM - 12 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 border border-orange-100 shadow-sm">
                <div className="flex gap-1 mb-4 text-orange-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic mb-4">"The atmosphere is incredible and the grill flavors are like nothing I've had before."</p>
                <p className="text-sm font-bold text-gray-900">— Sarah J.</p>
              </div>

              <div className="bg-orange-50 rounded-[2.5rem] p-8 border-2 border-dashed border-orange-200">
                <h4 className="text-xl font-black text-orange-600 mb-4 flex items-center gap-2 uppercase tracking-tight">Your Selection</h4>
                <div className="space-y-3 font-medium">
                  <div className="flex justify-between text-sm text-gray-400">Date: <span className="text-gray-900">{bookingData.date || '--'}</span></div>
                  <div className="flex justify-between text-sm text-gray-400">Time: <span className="text-gray-900">{bookingData.time || '--'}</span></div>
                  <div className="flex justify-between text-sm text-gray-400">Guests: <span className="text-gray-900">{bookingData.guests} People</span></div>
                  <div className="pt-3 mt-3 border-t border-orange-100 flex justify-between items-end">
                    <span className="text-gray-400 text-xs uppercase font-bold">Table No</span>
                    <span className="text-3xl font-black text-orange-600">{selectedTable || '--'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Reservation;