import { BiLeaf, BiRestaurant, BiWine } from "react-icons/bi";
import { FaPizzaSlice, FaHamburger, FaIceCream } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";

// Map your server categories to the correct icons
const iconMap = {
    "All": <BiRestaurant size={20} />,
    "Pizza": <FaPizzaSlice size={20} />,
    "Burgers": <FaHamburger size={20} />,
    "Desserts": <FaIceCream size={20} />,
    "Vegan": <BiLeaf size={20} />,
    "Non-Vegan": <TbMeat size={20} />,
    "Asian": <GiNoodles size={20} />,
    "Drinks": <BiWine size={20} />,
    // Add any other categories you might create in the Admin Dashboard here
};

// Ensure you receive and use onCategoryChange (passed as setSelectedCategory)
export default function Categories({ activeCategory, onCategoryChange, menuItems }) {
    
    // 1. Generate unique categories dynamically from menuItems
    const uniqueCategories = ['All'];
    const lowerCaseCategories = ['all']; // Use a set for efficient checking
    
    menuItems.forEach(item => {
        if (item.category) {
            const categoryName = item.category.trim();
            const lowerCaseName = categoryName.toLowerCase();
            
            // Check if we haven't added this category yet (case-insensitive check)
            if (!lowerCaseCategories.includes(lowerCaseName)) {
                // Add the category using the exact casing from the server
                uniqueCategories.push(categoryName); 
                lowerCaseCategories.push(lowerCaseName);
            }
        }
    });

    // 2. Render the category list
    return (
        <div className="flex flex-wrap justify-start gap-3 px-20 py-5 mb-8">
            {uniqueCategories.map((category) => {
                // Look up the icon, default to BiRestaurant if category is unknown
                const Icon = iconMap[category] || iconMap['All']; 
                const isActive = activeCategory.toLowerCase() === category.toLowerCase();
                
                return (
                    <button
                        key={category}
                        // Calls the filter function passed from Menu.jsx
                        onClick={() => onCategoryChange(category)} 
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors duration-200 
                            ${isActive 
                                ? 'bg-orange-500 text-white shadow-md' 
                                : 'bg-gray-100 text-gray-500 hover:bg-orange-100 hover:text-orange-600'
                            }`}
                    >
                        {Icon}
                        <span>{category}</span>
                    </button>
                );
            })}
        </div>
    );
}