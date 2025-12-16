const API_URL = 'http://localhost:5000/api/categories';

const getConfig = (token) => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

// GET all categories 
export const getCategories = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
};

// POST a new category 
export const createCategory = async (categoryData) => {
    // ... fetch setup ...
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || `Failed to create category with status ${response.status}`);
    }

    return await response.json();
};

// Update existing category 
export const updateCategory = async (categoryId, categoryData, token) => {
    const response = await fetch(`${API_URL}/${categoryId}`, {
        method: 'PUT', 
        ...getConfig(token),
        body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update category');
    }
    return response.json();
};

// Delete a category 
export const deleteCategory = async (categoryId, token) => {
    const response = await fetch(`${API_URL}/${categoryId}`, {
        method: 'DELETE',
        ...getConfig(token),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete category');
    }
    return response.json();
};