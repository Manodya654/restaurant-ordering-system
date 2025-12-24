import { BiBowlHot, BiBowlRice, BiCake, BiDish, BiFoodTag, BiLeaf, BiRestaurant, BiWine } from "react-icons/bi";
import { FaPizzaSlice, FaHamburger, FaIceCream } from "react-icons/fa";
import { GiBerriesBowl, GiNoodles } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";

const iconMap = {
    "All": <BiRestaurant size={18} />,
    "Pizza": <FaPizzaSlice size={18} />,
    "Burger": <FaHamburger size={18} />,
    "Desserts": <FaIceCream size={18} />,
    "Vegan": <BiLeaf size={18} />,
    "Non-Vegan": <TbMeat size={18} />,
    "Asian": <GiNoodles size={18} />,
    "Drinks": <BiWine size={18} />,
    "Mains": <BiBowlRice size={18} />,
    "Starters": <GiBerriesBowl size={18} />,
    "Specials": <BiCake size={18} />,
    "Beverages": <BiWine size={18} />,
    "Salads": <BiDish size={18} />,
    "Soups": <BiBowlHot size={18} />,
};

export default function Categories({ activeCategory, onCategoryChange, menuItems }) {
    const uniqueCategories = ['All'];
    const lowerCaseCategories = ['all']; 
    
    if (menuItems && menuItems.length > 0) {
        menuItems.forEach(item => {
            if (item.category) {
                const rawName = typeof item.category === 'object' ? item.category.name : item.category;
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
        <div className="flex flex-wrap gap-3">
            {uniqueCategories.map((category) => {
                const Icon = iconMap[category] || iconMap['All']; 
                const isActive = (activeCategory || 'All').toLowerCase() === category.toLowerCase();
                
                return (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)} 
                        className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300
                            ${isActive 
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-100 translate-y-[-2px]' 
                                : 'bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                            }`}
                    >
                        <span>{Icon}</span>
                        <span className="text-sm">{category}</span>
                    </button>
                );
            })}
        </div>
    );
}