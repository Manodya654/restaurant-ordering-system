import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package, Clock, CheckCircle, XCircle, Truck, ChefHat, Star } from 'lucide-react';

const OrderStatus = () => {
  const { orderId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
    item: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    // Check localStorage directly to avoid race condition
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      navigate('/login');
      return;
    }
    fetchOrderStatus();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOrderStatus, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchOrderStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          item: reviewData.item,
          order: orderId,
          rating: reviewData.rating,
          comment: reviewData.comment,
        }),
      });

      if (response.ok) {
        alert('Review submitted successfully! It will be visible after admin approval.');
        setShowReviewForm(false);
        setReviewData({ rating: 5, comment: '', item: '' });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: {
        icon: Clock,
        color: 'text-yellow-600 bg-yellow-100',
        text: 'Order Pending',
        description: 'Your order has been received and is being processed'
      },
      confirmed: {
        icon: CheckCircle,
        color: 'text-blue-600 bg-blue-100',
        text: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared'
      },
      preparing: {
        icon: ChefHat,
        color: 'text-purple-600 bg-purple-100',
        text: 'Preparing',
        description: 'Our chefs are preparing your delicious meal'
      },
      ready: {
        icon: Package,
        color: 'text-green-600 bg-green-100',
        text: 'Ready for Pickup',
        description: 'Your order is ready! Please come and collect it'
      },
      completed: {
        icon: CheckCircle,
        color: 'text-green-600 bg-green-100',
        text: 'Completed',
        description: 'Order completed. Thank you!'
      },
      cancelled: {
        icon: XCircle,
        color: 'text-red-600 bg-red-100',
        text: 'Cancelled',
        description: 'This order has been cancelled'
      }
    };

    return statusMap[status] || statusMap.pending;
  };

  const statusSteps = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Package className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find this order.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            >
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Order Status</h1>
                <p className="text-gray-600 mt-1">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo.color}`}>
                <StatusIcon size={20} />
                <span className="font-semibold">{statusInfo.text}</span>
              </div>
            </div>

            <p className="text-gray-700">{statusInfo.description}</p>
          </div>

          {/* Status Timeline */}
          {order.status !== 'cancelled' && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Timeline</h2>
              <div className="relative">
                {statusSteps.slice(0, -1).map((step, index) => {
                  const stepInfo = getStatusInfo(step);
                  const StepIcon = stepInfo.icon;
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step} className="flex items-center mb-8 last:mb-0">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-orange-500' : 'bg-gray-300'
                      }`}>
                        <StepIcon className="text-white" size={24} />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className={`font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                          {stepInfo.text}
                        </h3>
                        <p className={`text-sm ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                          {stepInfo.description}
                        </p>
                      </div>
                      {isCurrent && (
                        <span className="ml-4 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                          Current
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>
            
            <div className="space-y-4 mb-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-3 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    LKR {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                <span>Total</span>
                <span>LKR {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Name</p>
                <p className="font-semibold text-gray-900">{order.customerInfo?.fullName || order.deliveryAddress?.fullName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Phone</p>
                <p className="font-semibold text-gray-900">{order.customerInfo?.phone || order.deliveryAddress?.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Payment Method</p>
                <p className="font-semibold text-gray-900 capitalize">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Order Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString()} at{' '}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* Review Section - Show only when order is completed */}
          {order.status === 'completed' && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Leave a Review</h2>
              
              {!showReviewForm ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <Star size={20} />
                  Write a Review
                </button>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Item to Review
                    </label>
                    <select
                      value={reviewData.item}
                      onChange={(e) => setReviewData({ ...reviewData, item: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Choose an item...</option>
                      {order.items.map((item) => (
                        <option key={item._id} value={item.item}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewData({ ...reviewData, rating: star })}
                          className="text-3xl focus:outline-none"
                        >
                          <Star
                            size={32}
                            fill={star <= reviewData.rating ? '#f97316' : 'none'}
                            stroke={star <= reviewData.rating ? '#f97316' : '#d1d5db'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                      required
                      rows="4"
                      placeholder="Tell us about your experience..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400"
                    >
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setReviewData({ rating: 5, comment: '', item: '' });
                      }}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/menu')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Order Again
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderStatus;
