import { BiLeaf, BiRestaurant, BiWine } from "react-icons/bi";
import { FaPizzaSlice, FaHamburger, FaIceCream } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";

const iconMap = {
    "All": <BiRestaurant size={20} />,
    "Pizza": <FaPizzaSlice size={20} />,
    "Burgers": <FaHamburger size={20} />,
    "Desserts": <FaIceCream size={20} />,
    "Vegan": <BiLeaf size={20} />,
    "Non-Vegan": <TbMeat size={20} />,
    "Asian": <GiNoodles size={20} />,
    "Drinks": <BiWine size={20} />,
};

export default function Categories({ activeCategory, onCategoryChange, menuItems }) {
    
    const uniqueCategories = ['All'];
    const lowerCaseCategories = ['all']; 
    
    // SAFETY CHECK: Ensure menuItems exists before looping
    if (menuItems && menuItems.length > 0) {
        menuItems.forEach(item => {
            if (item.category) {
                // FIX: Extract name if category is an object, otherwise use the string
                const rawName = typeof item.category === 'object' 
                    ? item.category.name 
                    : item.category;

                // Ensure rawName exists and is a string before trimming
                if (rawName) {
                    const categoryName = String(rawName).trim();
                    const lowerCaseName = categoryName.toLowerCase();
                    
                    if (!lowerCaseCategories.includes(lowerCaseName)) {
                        uniqueCategories.push(categoryName); 
                        lowerCaseCategories.push(lowerCaseName);
                    }
                }
            }
        });
    }
 
    return (
        /* Reduced horizontal padding from px-20 to px-4 for better fit */
        <div className="flex flex-wrap justify-start gap-3 px-4 py-5 mb-8">
            {uniqueCategories.map((category) => {
                const Icon = iconMap[category] || iconMap['All']; 
                // Defensive check for activeCategory to prevent toLowerCase errors
                const isActive = (activeCategory || 'All').toLowerCase() === category.toLowerCase();
                
                return (
                    <button
                        key={category}
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