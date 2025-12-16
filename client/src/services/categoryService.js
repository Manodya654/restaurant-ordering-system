const API_URL = 'http://localhost:5000/api/categories';

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
// client/src/services/categoryService.js (Focus on createCategory)

export const createCategory = async (categoryData) => {
    // ... fetch setup ...
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Ensure you are passing the Authorization token if needed
        },
        body: JSON.stringify(categoryData),
    });

    // CRITICAL: Check the response status BEFORE parsing JSON
    if (!response.ok) {
        // If the server responded with 400 or 500, we throw a descriptive error
        const errorData = await response.json(); 
        throw new Error(errorData.message || `Failed to create category with status ${response.status}`);
    }

    // Only return the data if the status was 2xx
    return await response.json();
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