import React from 'react';
import { ChefHat, Heart, Utensils, Clock, Award, Star } from 'lucide-react';
import Img from "../assets/img.jpg"; 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  const stats = [
    { label: 'Years of Flavor', value: '8+', icon: Clock },
    { label: 'Expert Chefs', value: '12', icon: ChefHat },
    { label: 'Happy Customers', value: '15k+', icon: Heart },
    { label: 'Special Dishes', value: '45+', icon: Utensils },
  ];

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
        <Navbar />
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Img})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Our <span className="text-orange-500">Story</span>
          </h1>
          <p className="text-orange-50 text-lg max-w-2xl leading-relaxed">
            Founded in 2017, Flavor Town began with a simple mission: to bring authentic, 
            fiery flavors and unforgettable dining experiences to our community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Firing up the grill <br />
              <span className="text-orange-600">Since 2017</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              What started as a small neighborhood grill has grown into a destination for food lovers. 
              We believe that great food starts with quality ingredients and a passion for the craft. 
              Every spice, every sear, and every sauce is handled with care to ensure you get 
              the "Flavor Town" experience every time.
            </p>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-orange-100 shadow-sm">
                  <Award className="text-orange-500" size={20} />
                  <span className="font-bold text-gray-800">Best Grill 2023</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-orange-100 shadow-sm">
                  <Star className="text-orange-500" size={20} />
                  <span className="font-bold text-gray-800">4.9/5 Rating</span>
               </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-200/40 rounded-3xl rotate-3"></div>
            <img 
              src={Img} 
              alt="Our Kitchen" 
              className="relative rounded-2xl shadow-xl object-cover h-[400px] w-full"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-3xl border border-orange-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-4">
                  <Icon size={24} />
                </div>
                <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-[2rem] p-12 border border-orange-100 shadow-sm text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-[#FFF7ED] border border-orange-50">
              <h3 className="text-xl font-bold text-orange-600 mb-3">Freshness First</h3>
              <p className="text-gray-600">We source our ingredients daily from local farms to ensure every bite is at its peak flavor.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FFF7ED] border border-orange-50">
              <h3 className="text-xl font-bold text-orange-600 mb-3">Craft & Care</h3>
              <p className="text-gray-600">Our chefs are artists. Every plate is crafted with precision and a deep respect for culinary traditions.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FFF7ED] border border-orange-50">
              <h3 className="text-xl font-bold text-orange-600 mb-3">Community</h3>
              <p className="text-gray-600">We don't just serve customers; we feed neighbors. Our doors are always open for family and friends.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;