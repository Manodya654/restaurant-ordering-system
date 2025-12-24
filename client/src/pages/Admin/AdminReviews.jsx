import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminNavbar from '../../components/AdminNavbar';
import { Star, CheckCircle, XCircle, Eye, Trash2, MessageSquare } from 'lucide-react';

const AdminReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, approved, pending

  useEffect(() => {
    fetchReviews();
    const interval = setInterval(fetchReviews, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/reviews/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (reviewId, isApproved) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved }),
      });

      if (response.ok) {
        await fetchReviews();
      }
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review');
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchReviews();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'fill-orange-400 text-orange-400' : 'text-gray-200'}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'approved') return review.isApproved;
    if (filter === 'pending') return !review.isApproved;
    return true;
  });

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="min-h-screen bg-[#FFF7ED] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading reviews...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-[#FFF7ED] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Reviews</h1>
              <p className="text-gray-600 mt-1">Manage customer feedback and ratings.</p>
            </div>

            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-orange-100 gap-1">
              {['all', 'approved', 'pending'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    filter === type
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  <span className="ml-2 text-xs opacity-70">
                    ({type === 'all' ? reviews.length : reviews.filter(r => type === 'approved' ? r.isApproved : !r.isApproved).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredReviews.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-20 text-center">
                <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-orange-300" size={40} />
                </div>
                <p className="text-gray-500 text-lg font-medium">No reviews found in this category</p>
              </div>
            ) : (
              filteredReviews.map((review) => (
                <div key={review._id} className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Item Info Side */}
                    <div className="w-full md:w-48 shrink-0">
                      {review.item?.image ? (
                        <img
                          src={review.item.image}
                          alt={review.item.name}
                          className="w-full h-32 object-cover rounded-xl border border-orange-50"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center">
                          <Package className="text-gray-300" />
                        </div>
                      )}
                      <p className="mt-3 text-sm font-bold text-gray-900 line-clamp-2">{review.item?.name}</p>
                    </div>

                    {/* Content Side */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{review.user?.name}</h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              review.isApproved
                                ? 'bg-green-50 text-green-700 border-green-100'
                                : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                            }`}>
                              {review.isApproved ? 'Approved' : 'Pending Approval'}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="flex items-center gap-0.5">
                                {renderStars(review.rating)}
                             </div>
                             <span className="text-xs text-gray-400 font-medium">
                               {new Date(review.createdAt).toLocaleDateString()}
                             </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {!review.isApproved ? (
                            <button
                              onClick={() => handleApproval(review._id, true)}
                              className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-sm border border-green-100"
                              title="Approve"
                            >
                              <CheckCircle size={20} />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApproval(review._id, false)}
                              className="p-2 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-500 hover:text-white transition-all shadow-sm border border-yellow-100"
                              title="Unapprove"
                            >
                              <XCircle size={20} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(review._id)}
                            className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
                            title="Delete"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="relative">
                        <p className="text-gray-700 bg-[#FFF7ED]/50 p-4 rounded-xl border border-orange-50 italic">
                          "{review.comment}"
                        </p>
                      </div>
                      <p className="mt-2 text-[11px] text-gray-400 font-medium px-1">
                        User ID: {review.user?.email || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReviews;