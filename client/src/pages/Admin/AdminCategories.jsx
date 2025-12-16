import { useState, useEffect } from 'react'; 
import AdminNavbar from '../../components/AdminNavbar';
import { FaPlus, FaRegTrashAlt, FaRegEdit, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 
import * as categoryService from '../../services/categoryService';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ 
        name: '', 
        slug: '',
        image: '',
        color: '#f97316',
        displayOrder: 0, 
        isActive: true 
    });
    const [isEditing, setIsEditing] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const resetForm = () => {
        setFormData({ name: '', slug: '', image: '', color: '#f97316', displayOrder: 0, isActive: true });
        setIsEditing(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.image) {
            alert('Please fill in Category Name and Image URL.');
            return;
        }

        try {
            if (isEditing) {
                await categoryService.updateCategory(isEditing, formData); 
                alert('Category Updated Successfully!');
            } else {
                await categoryService.createCategory(formData); 
                alert('Category Added Successfully!');
            }
            fetchCategories(); 
            resetForm(); 
        } catch (err) {
            alert(`Error: ${err.message}`); 
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("WARNING: Deleting a category may affect menu items. Are you sure?")) return;
        try {
            await categoryService.deleteCategory(id);
            setCategories(categories.filter(cat => cat._id !== id));
            alert('Category deleted.');
            if (isEditing === id) resetForm();
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleEdit = (category) => {
        setFormData({
            name: category.name,
            image: category.image,
            color: category.color || '#f97316',
            displayOrder: category.displayOrder || 0,
            isActive: category.isActive ?? true
        });
        setIsEditing(category._id);
        document.getElementById('quick-add-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    let labelStyle = 'px-3 py-1 text-xs rounded-full font-semibold ';

    return (
        <div className="bg-orange-50 min-h-screen">
            <AdminNavbar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-10">
                    <div className="max-w-5xl mx-auto"> 
                        
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-800 mb-2">Category Management</h2>
                                <p className="text-gray-500">Manage categories, their visibility, and display order.</p>
                            </div>
                            <button 
                                onClick={() => { resetForm(); document.getElementById('quick-add-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                                className="flex items-center bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
                            >
                                <FaPlus className="mr-2" /> Add New Category
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                            {error && <div className="text-red-600 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">{error}</div>}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {['IMAGE', 'NAME', 'ORDERS', 'STATUS', 'ACTIONS'].map(header => (
                                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loading ? (
                                            <tr><td colSpan="5" className="text-center py-10 text-gray-500">Loading...</td></tr>
                                        ) : categories.map((category) => (
                                            <tr key={category._id} className="hover:bg-gray-50 transition">
                                              
                                                <td className="px-6 py-4">
                                                     <img src={category.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span 
                                                        className={labelStyle}
                                                        style={{ 
                                                            backgroundColor: `${category.color}20`, 
                                                            color: category.color,
                                                            border: `1px solid ${category.color}40`
                                                        }}
                                                    >
                                                        {category.name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-orange-600">{category.displayOrder}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {category.isActive ? 
                                                        <span className="flex items-center text-green-600"><FaCheckCircle className="mr-1"/> Active</span> : 
                                                        <span className="flex items-center text-red-400"><FaTimesCircle className="mr-1"/> Hidden</span>
                                                    }
                                                </td>
                                                <td className="px-6 py-4 flex space-x-3">
                                                    <button onClick={() => handleEdit(category)} className="text-gray-500 hover:text-orange-600"><FaRegEdit /></button>
                                                    <button onClick={() => handleDelete(category._id)} className="text-gray-500 hover:text-red-600"><FaRegTrashAlt /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="quick-add-section" className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-orange-500">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">{isEditing ? 'Edit Category' : 'Add New Category'}</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                                        <input name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Order (Lower appears first)</label>
                                        <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Image URL</label>
                                    <div className="flex space-x-4">
                                        <input name="image" value={formData.image} onChange={handleChange} className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" required />
                                        <img src={formData.image || 'https://via.placeholder.com/100'} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg w-fit">
                                    <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 accent-orange-500" />
                                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">Category is Visible to Customers</label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Theme Color</label>
                                    <div className="flex items-center space-x-3">
                                        <input 
                                            type="color" 
                                            name="color" 
                                            value={formData.color || '#f97316'} 
                                            onChange={handleChange} 
                                            className="w-12 h-12 p-1 rounded-md border border-gray-300 cursor-pointer"
                                        />
                                        <span className="text-gray-500 text-sm font-mono uppercase font-bold">{formData.color}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    {isEditing && <button type="button" onClick={resetForm} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>}
                                    <button type="submit" className="px-10 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition shadow-md">
                                        {isEditing ? 'Update Category' : 'Save Category'}
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