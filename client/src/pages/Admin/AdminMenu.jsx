import { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { FaSearch, FaRegEdit, FaRegTrashAlt, FaPlus, FaTable, FaTimes } from 'react-icons/fa';


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

const getStatusPill = (status) => {
    const style = 'text-xs font-semibold flex items-center ';
    if (status === 'Available') {
        return <span className={style + 'text-green-600'}><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Available</span>;
    } else {
        return <span className={style + 'text-red-600'}><div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>Sold Out</span>;
    }
};

const AdminMenu = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: 'Mains', image: '', status: 'Available', isPopular: false
    });
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // --- State for Search and Filtering ---
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Items'); // Matches initial button name

    // Categories available for filtering (Must match option values in form)
    const categoryFilters = ['All Items', 'Starters', 'Mains', 'Desserts', 'Drinks', 'Asian', 'Vegan'];


    // --- API & CRUD Functions ---

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/menu');
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
            ? `http://localhost:5000/api/menu/${isEditing}`
            : 'http://localhost:5000/api/menu';

        
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(formData) 
            });

            if (response.ok) {
                // SUCCESS: Re-fetch the entire list to update the table
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
            const response = await fetch(`http://localhost:5000/api/menu/${id}`, { method: 'DELETE' });

            
            if (response.ok) {
                // SUCCESS: Update the local state immediately
                setItems(items.filter(item => item._id !== id));
                alert('Item deleted.');
                // If the deleted item was being edited, clear the form
                if (isEditing === id) {
                    resetForm();
                }
            } else {
                alert('Failed to delete item.');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category || 'Mains',
            image: item.image,
            status: item.status || 'Available',
            isPopular: item.isPopular
        });
        setIsEditing(item._id);
        // Scroll to the Quick Add section
        document.getElementById('quick-add-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    // --- Search and Filter Logic ---

    const filteredItems = items
        .filter(item => {
            // 1. Filter by Search Term (case-insensitive on name and description)
            if (searchTerm === '') return true;
            const lowerCaseSearch = searchTerm.toLowerCase();
            return (
                item.name.toLowerCase().includes(lowerCaseSearch) ||
                item.description.toLowerCase().includes(lowerCaseSearch)
            );
        })
        .filter(item => {
            // 2. Filter by Category
            if (activeFilter === 'All Items') return true;
            return item.category === activeFilter;
        });
    
    // --- Component Rendering ---
    
    return (
        <div className="bg-orange-50 min-h-screen">
            
            {/* 1. TOP NAVBAR */}
            <AdminNavbar />

            {/* 2. Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-10">
                    <div className="max-w-6xl mx-auto"> 
                        
                        {/* Title and Add New Button */}
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-800 mb-2">Menu Inventory</h2>
                                <p className="text-gray-500">Manage availability, prices, and details of the dishes.</p>
                            </div>
                            
                            <button 
                                onClick={() => document.getElementById('quick-add-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
                            >
                                <FaPlus className="mr-2" /> Add New Item
                            </button>
                        </div>

                        {/* Menu Management Section */}
                        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                            
                            {/* Search and Category Filters */}
                            <div className="flex justify-between items-center mb-6 space-x-4">
                                <div className="relative flex-grow max-w-lg">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search by item name..."  
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    {searchTerm && (
                                        <button 
                                            onClick={() => setSearchTerm('')} 
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>
                                
                                {/* Category Filter Buttons */}
                                <div className="flex space-x-2 overflow-x-auto pb-1">
                                    {categoryFilters.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => setActiveFilter(cat)}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                                                activeFilter === cat 
                                                ? 'bg-gray-800 text-white shadow-md' 
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
                                        ) : filteredItems.length === 0 ? (
                                            <tr><td colSpan="6" className="text-center py-10 text-gray-500">No items found matching your filter criteria.</td></tr>
                                        ) : (
                                            filteredItems.map((item) => (
                                                <tr key={item._id} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-gray-200" />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                        <div className="text-xs text-gray-500 line-clamp-1">{item.description}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
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
                            
                            {/* Pagination/Summary */}
                            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                                <span>Showing 1 to {filteredItems.length} of {items.length} total Items</span>
                                {/* Add real pagination here if needed for coursework, otherwise this summary is fine */}
                            </div>
                        </div>

                        {/* Quick Add Section */}
                        <div id="quick-add-section" className="p-6 bg-white rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{isEditing ? 'Edit Item' : 'Quick Add Item'}</h3>
                            <p className="text-gray-500 mb-6">{isEditing ? 'Modify the details below and click Save Changes.' : 'Add a single item to the inventory.'}</p>

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
                                        {/* Use the filter categories for consistency */}
                                        {categoryFilters.slice(1).map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
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
                                        name="price" type="number" placeholder="Price (LKR)" value={formData.price} onChange={handleChange} 
                                        className="p-3 border border-gray-300 rounded-lg focus:outline-orange-500 col-span-1" required 
                                    />
                                    <select 
                                        name="status" value={formData.status} onChange={handleChange} 
                                        className="p-3 border border-gray-300 rounded-lg focus:outline-orange-500 appearance-none bg-white col-span-1"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Sold Out">Sold Out</option>
                                    </select>
                                    <div className="col-span-1"></div>

                                    {/* Row 3: Description */}
                                    <textarea 
                                        name="description" placeholder="Description (List ingredients and details...)" value={formData.description} onChange={handleChange} 
                                        rows="3"
                                        className="p-3 border border-gray-300 rounded-lg focus:outline-orange-500 col-span-3" required 
                                    />

                                    {/* Row 4: Buttons */}
                                    <div className="col-span-3 flex justify-end space-x-4 pt-4">
                                        {isEditing && (
                                            <button 
                                                type="button" 
                                                onClick={resetForm} 
                                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                            >
                                                Cancel
                                            </button>
                                        )}
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
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminMenu;