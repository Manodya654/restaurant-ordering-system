import { useState, useEffect } from 'react'; // Removed useContext for now
import AdminNavbar from '../../components/AdminNavbar';
import { FaPlus, FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import * as categoryService from '../../services/categoryService'; 
// Note: Ensure the path '../../services/categoryService' matches your folder structure

const AdminCategories = () => {
    // const { user } = useContext(AuthContext); // Commented out user context extraction
    
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ name: '', image: '' });
    const [isEditing, setIsEditing] = useState(null); // Stores ID of category being edited
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- API & CRUD Functions ---

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await categoryService.getCategories();
            setCategories(data);
        } catch (err) {
            setError(err.message || 'Could not connect to fetch categories.');
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({ name: '', image: '' });
        setIsEditing(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.image) {
            alert('Please fill in Category Name and Image URL.');
            return;
        }

        // --- AUTH CHECK REMOVED FOR TESTING ---
        // if (!user || user.role !== 'admin') {
        //     alert('Access denied. Only administrators can modify categories.');
        //     return;
        // }

        try {
            if (isEditing) {
                // UPDATE OPERATION
                // Calling the update function from categoryService
                await categoryService.updateCategory(isEditing, formData); 
                alert('Category Updated Successfully!');
            } else {
                // CREATE OPERATION
                // Token is handled inside the service file (Dummy Token)
                await categoryService.createCategory(formData); 
                alert('Category Added Successfully!');
            }
            
            fetchCategories(); // Refresh list
            resetForm(); // Clear form
            
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`); 
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("WARNING: Deleting a category may affect menu items. Are you sure?")) return;
        
        // --- AUTH CHECK REMOVED FOR TESTING ---
        // if (!user || user.role !== 'admin') { ... }

        try {
            await categoryService.deleteCategory(id);
            // Optimistically update UI
            setCategories(categories.filter(cat => cat._id !== id));
            alert('Category deleted.');
            
            // If we deleted the item currently being edited, reset the form
            if (isEditing === id) {
                resetForm();
            }
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        }
    };

    const handleEdit = (category) => {
        setFormData({
            name: category.name,
            image: category.image,
        });
        setIsEditing(category._id);
        // Scroll to the form
        document.getElementById('quick-add-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    
    return (
        <div className="bg-orange-50 min-h-screen">
            <AdminNavbar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-10">
                    <div className="max-w-4xl mx-auto"> 
                        
                        {/* Title and Add New Button */}
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-800 mb-2">Category Management</h2>
                                <p className="text-gray-500">Define and manage the food categories (Starters, Mains, etc.).</p>
                            </div>
                            <button 
                                onClick={() => {
                                    resetForm();
                                    document.getElementById('quick-add-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="flex items-center bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
                            >
                                <FaPlus className="mr-2" /> Add New Category
                            </button>
                        </div>

                        {/* Category List Section */}
                        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                            
                            {error && <div className="text-red-600 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">{error}</div>}

                            {/* Categories Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {['NAME', 'IMAGE PREVIEW', 'ID', 'ACTIONS'].map(header => (
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
                                            <tr><td colSpan="4" className="text-center py-10 text-gray-500">Loading categories...</td></tr>
                                        ) : categories.length === 0 ? (
                                            <tr><td colSpan="4" className="text-center py-10 text-gray-500">No categories found.</td></tr>
                                        ) : (
                                            categories.map((category) => (
                                                <tr key={category._id} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                         <img src={category.image} alt={category.name} className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">{category._id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                                                        <button onClick={() => handleEdit(category)} className="text-gray-500 hover:text-orange-600" title="Edit">
                                                            <FaRegEdit />
                                                        </button>
                                                        <button onClick={() => handleDelete(category._id)} className="text-gray-500 hover:text-red-600" title="Delete">
                                                            <FaRegTrashAlt />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Quick Add/Edit Section */}
                        <div id="quick-add-section" className="p-6 bg-white rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{isEditing ? 'Edit Category' : 'Add New Category'}</h3>
                            <p className="text-gray-500 mb-6">{isEditing ? `Editing: ${formData.name}` : 'Enter details for a new category.'}</p>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                                    <input 
                                        name="name" 
                                        placeholder="e.g., Starters, Mains" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-orange-500" required 
                                    />
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Image URL (Icon/Header image)</label>
                                    <div className="flex space-x-4">
                                        <input 
                                            name="image" 
                                            placeholder="Image URL" 
                                            value={formData.image} 
                                            onChange={handleChange} 
                                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-orange-500" required 
                                        />
                                        <img src={formData.image || 'https://via.placeholder.com/100x50?text=Preview'} alt="Preview" className="w-20 h-10 object-cover rounded-lg border border-gray-200" />
                                    </div>
                                </div>
                                
                                <div className="md:col-span-3 flex justify-end space-x-4 pt-4">
                                    {isEditing && (
                                        <button 
                                            type="button" 
                                            onClick={resetForm} 
                                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                    <button 
                                        type="submit" 
                                        className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                                    >
                                        {isEditing ? 'Save Changes' : 'Save Category'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminCategories;