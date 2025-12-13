// import { BiLeaf, BiRestaurant, BiWine } from "react-icons/bi"
// import { FaPizzaSlice, FaHamburger, FaIceCream } from "react-icons/fa"
// import { GiNoodles } from "react-icons/gi"
// import { TbMeat } from "react-icons/tb"

// const categories = [
//   { name: "All", icon: <BiRestaurant /> },
//   { name: "Pizza", icon: <FaPizzaSlice /> },
//   { name: "Burgers", icon: <FaHamburger /> },
//   { name: "Desserts", icon: <FaIceCream /> },
//   { name: "Vegan", icon: <BiLeaf /> },
//   { name: "Non-Vegan", icon: <TbMeat /> },
//   { name: "Asian", icon: <GiNoodles /> },
//   { name: "Drinks", icon: <BiWine /> },
// ]

// export default function Categories({ selectedCategory, setSelectedCategory }) {
//   return (
//     <div className="flex gap-3 overflow-x-auto px-8 mt-6">
//       {categories.map((cat) => {
//         const isActive = selectedCategory === cat.name

//         return (
//           <button
//             key={cat.name}
//             onClick={() => setSelectedCategory(cat.name)}
//             className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition
//               ${
//                 isActive
//                   ? "bg-orange-500 text-white shadow-md"
//                   : "bg-orange-50 text-orange"
//               }`}
//           >
//             {cat.icon}
//             {cat.name}
//           </button>
//         )
//       })}
//     </div>
//   )
// }


// client/src/components/Categories.jsx

import { BiLeaf, BiRestaurant, BiWine } from "react-icons/bi";
import { FaPizzaSlice, FaHamburger, FaIceCream } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { TbMeat } from "react-icons/tb";

// Map your server categories to the correct icons
const iconMap = {
    "All": <BiRestaurant />,
    "Pizza": <FaPizzaSlice />,
    "Burgers": <FaHamburger />,
    "Desserts": <FaIceCream />,
    "Vegan": <BiLeaf />,
    "Non-Vegan": <TbMeat />,
    "Asian": <GiNoodles />,
    "Drinks": <BiWine />,
    // Add any other categories you might create in the Admin Dashboard here
};

export default function Categories({ selectedCategory, setSelectedCategory, menuItems }) {
    
    // 1. Get unique categories dynamically from the fetched items
    // This allows categories to show up only if items exist in them.
    const uniqueCategories = ['All'];
    menuItems.forEach(item => {
        if (item.category && !uniqueCategories.includes(item.category)) {
            // Note: We are using item.category (e.g., "Asian") for filtering, 
            // but the display name will use the map above (e.g., "Asian").
            uniqueCategories.push(item.category);
        }
    });

    return (
        <div className="flex gap-3 overflow-x-auto px-8 mt-6">
            {uniqueCategories.map((catName) => {
                const isActive = selectedCategory === catName;

                return (
                    <button
                        key={catName}
                        onClick={() => setSelectedCategory(catName)}
                        className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition whitespace-nowrap
                            ${
                                isActive
                                    ? "bg-orange-500 text-white shadow-md"
                                    : "bg-orange-50 text-orange-600 border border-orange-200"
                            }`}
                    >
                        {/* Use the icon map to get the correct icon */}
                        {iconMap[catName] || <BiRestaurant />} 
                        {catName}
                    </button>
                );
            })}
        </div>
    );
}