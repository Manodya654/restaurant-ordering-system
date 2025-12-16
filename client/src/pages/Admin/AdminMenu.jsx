import { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { FaSearch, FaRegEdit, FaRegTrashAlt, FaPlus, FaTable } from 'react-icons/fa';
import * as categoryService from '../../services/categoryService';

const PREP_TIME_OPTIONS = [
    "5 - 10 mins", "10 - 15 mins", "15 - 20 mins", 
    "20 - 30 mins", "30 - 45 mins", "Over 45 mins"
];

const AdminMenu = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: '', image: '', 
        status: 'Available', isPopular: false, calories: '', prepTime: '10 - 15 mins'
    });
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Items');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [itemRes, catData] = await Promise.all([
                fetch('http://localhost:5000/api/menu'),
                categoryService.getCategories()
            ]);
            const itemData = await itemRes.json();
            setItems(itemData);
            setCategories(catData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTopCategoryFilters = () => {
        const counts = {};
        items.forEach(item => {
            const catName = item.category?.name;
            if (catName) counts[catName] = (counts[catName] || 0) + 1;
        });

        const topNames = Object.keys(counts)
            .sort((a, b) => counts[b] - counts[a])
            .slice(0, 6);
            
        return ['All Items', ...topNames];
    };

    const displayFilters = getTopCategoryFilters();

    const getCategoryPill = (categoryObj) => {
        if (!categoryObj || !categoryObj.name) return <span className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-400">N/A</span>;
        return (
            <span 
                className="px-3 py-1 text-xs rounded-full font-semibold border capitalize"
                style={{ 
                    backgroundColor: `${categoryObj.color}15`, 
                    color: categoryObj.color,
                    borderColor: `${categoryObj.color}40`
                }}
            >
                {categoryObj.name}
            </span>
        );
    };

    const getStatusPill = (status) => {
        const isAvail = status === 'Available';
        return (
            <span className={`text-xs font-semibold flex items-center ${isAvail ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${isAvail ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {status}
            </span>
        );
    };

    const getPrepTime = (time) => (
    <span className="text-xs text-gray-600 flex items-center gap-1">
        <FaClock className="text-blue-400" /> {time}
    </span>
);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: '', category: '', image: '', status: 'Available', isPopular: false, calories: '', prepTime: '10 - 15 mins' });
        setIsEditing(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing ? `http://localhost:5000/api/menu/${isEditing}` : 'http://localhost:5000/api/menu';
        try {
            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) { fetchInitialData(); resetForm(); alert('Item Saved Successfully!'); }
        } catch (error) { alert('Failed to save item.'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this item?")) return;
        try {
            const response = await fetch(`http://localhost:5000/api/menu/${id}`, { method: 'DELETE' });
            if (response.ok) setItems(items.filter(i => i._id !== id));
        } catch (error) { console.error(error); }
    };

    const handleEdit = (item) => {
        setFormData({ ...item, category: item.category?._id || item.category });
        setIsEditing(item._id);
        document.getElementById('quick-add-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const filteredItems = items
        .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(item => activeFilter === 'All Items' ? true : item.category?.name === activeFilter);

    return (
        <div className="bg-orange-50 min-h-screen">
            <AdminNavbar />
            <main className="p-10 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Menu Inventory</h2>
                        <p className="text-gray-500">Manage your dishes and track category popularity.</p>
                    </div>
                    <button onClick={() => { resetForm(); document.getElementById('quick-add-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md flex items-center">
                        <FaPlus className="mr-2" /> Add New Item
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                        <div className="relative flex-grow max-w-lg">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" placeholder="Search by item name..." value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
                            />
                        </div>

                        <div className="flex space-x-2 overflow-x-auto pb-1">
                            {displayFilters.map(catName => (
                                <button 
                                    key={catName} 
                                    onClick={() => setActiveFilter(catName)}
                                    className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-200 whitespace-nowrap border ${
                                        activeFilter === catName 
                                        ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-md' 
                                        : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
                                    }`}
                                >
                                    {catName}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['Image', 'Item Details', 'Category', 'Price', 'Status', 'Calories', 'Prep Time', 'Actions'].map(h => (
                                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredItems.map(item => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <img src={item.image} className="w-12 h-12 rounded-lg object-cover bg-gray-100" alt={item.name}/>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-gray-800">{item.name}</div>
                                            <div className="text-xs text-gray-400 line-clamp-1">{item.description}</div>
                                        </td>
                                        <td className="px-6 py-4">{getCategoryPill(item.category)}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-orange-600">LKR {item.price}</td>
                                        <td className="px-6 py-4">{getStatusPill(item.status)}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                                            {item.calories ? `🔥 ${item.calories} kcal` : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                                            <span className="flex items-center"><span className="mr-1 text-blue-800">⌚</span> {item.prepTime}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-3">
                                                <button onClick={() => handleEdit(item)} className="text-gray-400 hover:text-orange-500 transition"><FaRegEdit size={16}/></button>
                                                <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-500 transition"><FaRegTrashAlt size={16}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="quick-add-section" className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-orange-500">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1">
                            <div className="h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                                {formData.image ? <img src={formData.image} className="w-full h-full object-cover" alt="preview"/> : <FaTable className="text-gray-300 size-10"/>}
                            </div>
                            <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-2 text-xs border rounded focus:ring-2 focus:ring-orange-400 outline-none" required />
                        </div>

                        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" required />
                            <select name="category" value={formData.category} onChange={handleChange} className="p-3 border rounded-lg bg-white focus:ring-2 focus:ring-orange-400 outline-none" required>
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            <input name="price" type="number" placeholder="Price (LKR)" value={formData.price} onChange={handleChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" required />
                            <input name="calories" type="number" placeholder="Calories (optional)" value={formData.calories} onChange={handleChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" />
                            <select name="prepTime" value={formData.prepTime} onChange={handleChange} className="p-3 border rounded-lg bg-white">
                                {PREP_TIME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <select name="status" value={formData.status} onChange={handleChange} className="p-3 border rounded-lg bg-white">
                                <option value="Available">Available</option>
                                <option value="Sold Out">Sold Out</option>
                            </select>
                            <textarea name="description" placeholder="Description..." value={formData.description} onChange={handleChange} className="p-3 border rounded-lg md:col-span-2 h-24 focus:ring-2 focus:ring-orange-400 outline-none" required />
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="size-5 accent-orange-500 cursor-pointer" />
                                <span className="text-sm font-medium text-gray-700">Mark as Popular</span>
                            </div>
                            <div className="md:col-span-3 flex justify-end space-x-3 mt-4">
                                {isEditing && <button type="button" onClick={resetForm} className="px-6 py-2 text-gray-400 hover:text-gray-600 font-medium">Cancel</button>}
                                <button type="submit" className="px-10 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition shadow-lg">
                                    {isEditing ? 'Update Item' : 'Create Item'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AdminMenu;