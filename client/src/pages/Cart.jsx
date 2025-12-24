import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* pt-24 added to clear the navbar height */}
        <div className="flex-grow bg-[#FFF7ED] pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-orange-100">
              <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
              <h2 className="text-3xl font-black text-gray-900 mb-2">Your Cart is Empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any "Flavor Town" hits yet!</p>
              <button
                onClick={() => navigate('/menu')}
                className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
              >
                Browse Menu
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF7ED]">
      <Navbar />
      
      {/* pt-28 ensures content starts well below the fixed Navbar */}
      <div className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-black text-gray-900">Your <span className="text-orange-600">Cart</span></h1>
              <p className="text-gray-500 font-medium">Review your items before we fire up the grill.</p>
            </div>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 font-bold text-sm underline decoration-2 underline-offset-4"
            >
              Clear All Items
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-orange-50 p-5 flex items-center gap-6 group hover:shadow-md transition-shadow">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 object-cover transform group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-1">{item.description}</p>
                    <p className="text-orange-600 font-black text-lg mt-3">
                      LKR {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-1.5 border border-orange-100">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white text-orange-600 rounded-lg shadow-sm hover:bg-orange-500 hover:text-white transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-black text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white text-orange-600 rounded-lg shadow-sm hover:bg-orange-500 hover:text-white transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Side Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] shadow-sm border border-orange-100 p-8 sticky top-28">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span>LKR {getCartTotal().toLocaleString()}</span>
                  </div>
                  {/* <div className="flex justify-between text-gray-500 font-medium">
                    <span>Delivery</span>
                    <span className="text-green-600 font-bold italic underline">FREE</span>
                  </div> */}
                  <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-bold">Total Amount</span>
                      <span className="text-2xl font-black text-orange-600">LKR {getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-orange-200 hover:bg-orange-700 hover:-translate-y-1 transition-all active:scale-95"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => navigate('/menu')}
                    className="w-full bg-white border-2 border-orange-100 text-orange-600 py-4 rounded-2xl font-black hover:bg-orange-50 transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;