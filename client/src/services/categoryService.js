// client/src/services/categoryService.js

const API_URL = 'http://localhost:5000/api/categories';

// Helper function to get the authorization header
const getConfig = (token) => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

// GET: Fetch all categories (Public)
export const getCategories = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
};

// POST: Create a new category (Admin)
export const createCategory = async (categoryData, token) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        ...getConfig(token),
        body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create category');
    }
    return response.json();
};

// PUT: Update an existing category (Admin) 
export const updateCategory = async (categoryId, categoryData, token) => {
    const response = await fetch(`${API_URL}/${categoryId}`, {
        method: 'PUT', // Updated method to PUT
        ...getConfig(token),
        body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update category');
    }
    return response.json();
};

// DELETE: Delete a category (Admin)
export const deleteCategory = async (categoryId, token) => {
    const response = await fetch(`${API_URL}/${categoryId}`, {
        method: 'DELETE',
        ...getConfig(token),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete category');
    }
    // Expected to return a JSON message on success
    return response.json();
};