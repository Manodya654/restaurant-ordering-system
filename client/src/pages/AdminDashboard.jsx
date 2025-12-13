// client/src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Import the new sidebar
import { FaSearch, FaRegEdit, FaRegTrashAlt, FaPlus, FaTable, FaUserCircle } from 'react-icons/fa';

// Helper function to render Category pill color
const getCategoryPill = (category) => {
    let style = 'px-3 py-1 text-xs rounded-full font-semibold ';
    switch (category) {
        case 'Mains':
        case 'Burger':
            style += 'bg-green-100 text-green-700';
            break;
        case 'Starters':
        case 'Asian':
            style += 'bg-yellow-100 text-yellow-700';
            break;
        case 'Desserts':
            style += 'bg-pink-100 text-pink-700';
            break;
        case 'Drinks':
            style += 'bg-blue-100 text-blue-700';
            break;
        default:
            style += 'bg-gray-100 text-gray-700';
    }
    return <span className={style}>{category}</span>;
};

// Helper function to render Status pill
const getStatusPill = (status) => {
    const style = 'text-xs font-semibold flex items-center ';
    if (status === 'Available') {
        return <span className={style + 'text-green-600'}><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Available</span>;
    } else {
        return <span className={style + 'text-red-600'}><div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>Sold Out</span>;
    }
};

const AdminDashboard = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Mains', // Matches design category names
        image: '',
        status: 'Available', // Added status field
        isPopular: false
    });
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: '', category: 'Mains', image: '', status: 'Available', isPopular: false });
        setIsEditing(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.price || !formData.image) {
            alert('Please fill in Name, Price, and Image URL.');
            return;
        }

        const url = isEditing 
          ? `http://localhost:5000/api/items/${isEditing}`
          : 'http://localhost:5000/api/items';
        
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(formData) 
            });

            if (response.ok) {
                fetchItems(); 
                resetForm();
                alert(isEditing ? 'Item Updated Successfully!' : 'Item Added Successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to save item.'}`);
            }
        } catch (error) {
            console.error('Network error during save:', error);
            alert('Could not connect to the server. Check if your backend is running.');
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await fetch(`http://localhost:5000/api/items/${id}`, { method: 'DELETE' });
            setItems(items.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item) => {
        // Map current database category (e.g., "Burger") to dashboard display category (e.g., "Mains")
        // For simplicity in this coursework, let's assume the categories match or just update the form fields directly.
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category || 'Mains',
            image: item.image,
            status: item.status || 'Available', // Use existing status or default
            isPopular: item.isPopular
        });
        setIsEditing(item._id);
        // Scroll to the Quick Add section
        document.getElementById('quick-add-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* 1. Sidebar */}
            <Sidebar />

            {/* 2. Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* Top Header/Navbar */}
                <header className="flex justify-between items-center h-20 bg-white p-6 shadow-md">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                            <FaPlus className="mr-2" /> Add New Item
                        </button>
                        <FaUserCircle className="w-8 h-8 text-gray-500" />
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">Menu Inventory</h2>
                    <p className="text-gray-500 mb-8">Manage availability, prices, and details of your dishes.</p>

                    {/* Menu Management Section */}
                    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                        
                        {/* Search and Category Filters */}
                        <div className="flex justify-between items-center mb-6 space-x-4">
                            <div className="relative flex-grow max-w-lg">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search by item name..." 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="flex space-x-2">
                                {/* Basic Category Pills */}
                                {['All Items', 'Starters', 'Mains', 'Desserts', 'Drinks'].map(cat => (
                                    <button 
                                        key={cat}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                            cat === 'All Items' 
                                            ? 'bg-gray-800 text-white' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {['IMAGE', 'ITEM DETAILS', 'CATEGORY', 'PRICE', 'STATUS', 'ACTIONS'].map(header => (
                                            <th 
                                                key={header}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {loading ? (
                                        <tr><td colSpan="6" className="text-center py-10 text-gray-500">Loading items...</td></tr>
                                    ) : items.length === 0 ? (
                                        <tr><td colSpan="6" className="text-center py-10 text-gray-500">No items found. Add one below!</td></tr>
                                    ) : (
                                        items.map((item) => (
                                            <tr key={item._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-gray-200" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                    <div className="text-xs text-gray-500 line-clamp-1">{item.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {/* Using the server category for the pill */}
                                                    {getCategoryPill(item.category)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    LKR {item.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusPill(item.status || 'Available')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                                                    <button onClick={() => handleEdit(item)} className="text-gray-500 hover:text-orange-600">
                                                        <FaRegEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(item._id)} className="text-gray-500 hover:text-red-600">
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination/Summary (Simplified for coursework) */}
                        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                            <span>Showing 1 to {items.length} of {items.length} Items</span>
                        </div>
                    </div>

                    {/* Quick Add Section */}
                    <div id="quick-add-section" className="p-6 bg-white rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Add Item</h3>
                        <p className="text-gray-500 mb-6">Add a single item to the inventory</p>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            
                            {/* 1. Item Image Input */}
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Item Image URL</label>
                                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-40">
                                    {formData.image ? (
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                                    ) : (
                                        <>
                                            <FaTable className="w-8 h-8 text-gray-400 mb-2" />
                                            <p className="text-center text-xs text-gray-500">Paste a URL below.</p>
                                        </>
                                    )}
                                </div>
                                <input 
                                    name="image" 
                                    placeholder="Image URL" 
                                    value={formData.image} 
                                    onChange={handleChange} 
                                    className="mt-2 w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-orange-500" required 
                                />
                                {isEditing && <p className="text-xs text-gray-500 truncate mt-1">Editing URL: {formData.image}</p>}
                            </div>

                            {/* 2. Item Details (Three Columns) */}
                            <div className="md:col-span-3 grid grid-cols-3 gap-4">
                                
                                {/* Row 1 */}
                                <input 
                                    name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} 
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-orange-500 col-span-1" required 
                                />
                                <select 
                                    name="category" value={formData.category} onChange={handleChange} 
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-orange-500 appearance-none bg-white col-span-1"
                                >
                                    {/* Ensure these match your pill categories */}
                                    <option value="Mains">Mains</option>
                                    <option value="Starters">Starters</option>
                                    <option value="Desserts">Desserts</option>
                                    <option value="Drinks">Drinks</option>
                                    <option value="Asian">Asian</option>
                                    <option value="Vegan">Vegan</option>
                                </select>
                                <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg bg-gray-50 col-span-1">
                                    <input 
                                      name="isPopular" type="checkbox" checked={formData.isPopular} onChange={handleChange} 
                                      className="w-5 h-5 text-orange-600 focus:ring-orange-500 rounded border-gray-300" 
                                    />
                                    <span className="text-gray-700 text-sm">Mark as Popular</span>
                                </label>
                                
                                {/* Row 2 */}
                                <input 
                                    name="price" type="number" placeholder="Price ($)" value={formData.price} onChange={handleChange} 
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-orange-500 col-span-1" required 
                                />
                                <select 
                                    name="status" value={formData.status} onChange={handleChange} 
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-orange-500 appearance-none bg-white col-span-1"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Sold Out">Sold Out</option>
                                </select>
                                <div className="col-span-1"></div> {/* Spacer */}

                                {/* Row 3: Description */}
                                <textarea 
                                    name="description" placeholder="Description (List ingredients and details...)" value={formData.description} onChange={handleChange} 
                                    rows="3"
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-orange-500 col-span-3" required 
                                />

                                {/* Row 4: Buttons */}
                                <div className="col-span-3 flex justify-end space-x-4 pt-4">
                                    <button 
                                        type="button" 
                                        onClick={resetForm} 
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                                    >
                                        {isEditing ? 'Save Changes' : 'Save Item'}
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;