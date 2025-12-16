// import burger from "../assets/burger.jpg"
// import pizza from "../assets/pizza.jpg"
// import vegan from "../assets/vegan.jpg"
// import cake from "../assets/cake.jpg"
// import asian from "../assets/asian.jpg"

// const items = [
//     {
//       name: "Classic Beef Burger",
//       description: "Juicy beef patty with lettuce, tomato, onions, pickles, and our special sauce", 
//       price: "$12.99", 
//       img: burger,
//       category: "Burgers",
//       isPopular: true, 
//     },
//     {
//       name: "Margherita Pizza",
//       description: "Fresh mozzarella, tomato sauce, and basil on our homemade dough", 
//       price: "$14.99", 
//       img: pizza,
//       category: "Pizza",
//       isPopular: true, 
//     },
//     {
//       name: "Creamy Carbonara",
//       description: "Traditional Italian pasta with eggs, cheese, pancetta, and black pepper", 
//       price: "$16.99", 
//       img: vegan,
//       category: "Non-Vegan",
//       isPopular: true, 
//     },
//     {
//       name: "Chocolate Lava Cake",
//       description: "Rich chocolate cake with a molten chocolate center, served with vanilla ice...", 
//       price: "$7.99", 
//       img: cake,
//       category: "Desserts",
//       isPopular: true, 
//     },
//     {
//       name: "Fresh Juice",
//       description: "A blend of fresh seasonal fruits",
//       price: "LKR 1200",
//       img: asian,
//       category: "Drinks",
//       isPopular: false,
//     },
//     {
//       name: "Fresh Juice",
//       description: "A blend of fresh seasonal fruits",
//       price: "LKR 1200",
//       img: asian,
//       category: "Drinks",
//       isPopular: false,
//     },
// ]

// export default function MenuGrid({ selectedCategory }) {
//   const filteredItems =
//     selectedCategory === "All"
//       ? items
//       : items.filter((item) => item.category === selectedCategory)

//   const addToCart = (item) => {
//     alert(`${item.name} added to cart`)
//   }

//   return (
//     <section className="px-8 mt-8 grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//       {filteredItems.length === 0 && (
//         <p className="text-gray-500">No items found</p>
//       )}

//       {filteredItems.map((item, index) => (
//         <div
//           key={index}
//           className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:ring-2 hover:ring-orange-500 cursor-pointer relative" 
//         >
//             {item.isPopular && (
//                 <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
//                     <FaStar className="w-3 h-3 text-white"/>
//                     Popular
//                 </div>
//             )}
            
//             <div className="h-40 w-full overflow-hidden rounded-t-xl">
//                 <img
//                     src={item.img}
//                     alt={item.name}
//                     // Adjusted height to h-full to fill the div, but overall height is controlled by parent div
//                     className="h-full w-full object-cover transform hover:scale-105 transition duration-500" 
//                 />
//             </div>

//             <div className="p-4 flex flex-col justify-between">
//                 <div>
//                     <h3 className="font-bold text-base">{item.name}</h3>
//                     <p className="text-gray-500 text-xs mt-1 leading-normal mb-3">{item.description}</p>
//                 </div>

//                 <div className="flex justify-between items-center mt-2">
//                     <p className="text-orange-600 font-bold text-lg">{item.price}</p> 

//                     <button
//                         onClick={() => addToCart(item)}
//                         // bg-orange-500, rounded-full, fixed size (w-8 h-8), center content
//                         className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition duration-150"
//                     >
//                         <FaPlus className="w-4 h-4" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//       ))}
//     </section>
//   )
// }



import { FaPlus, FaStar } from "react-icons/fa";

export default function MenuGrid({ items }) {

    const addToCart = (item) => {

        alert(`${item.name} (LKR ${item.price}) added to cart!`);
    };

    if (items.length === 0) {
        return (
            <section className="px-8 mt-8">
                <p className="text-gray-500 text-center py-10 text-lg">
                    No items found in this category.
                </p>
            </section>
        );
    }

    return (
      <div className="container mx-auto">
        <section className="px-8 mt-8 grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((item) => (
                <div
                    key={item._id} 
                    className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:ring-2 hover:ring-orange-500 cursor-pointer relative" 
                >
                    {item.isPopular && (
                        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                            <FaStar className="w-3 h-3 text-white"/>
                            Popular
                        </div>
                    )}
                    
                    <div className="h-40 w-full overflow-hidden rounded-t-xl">
                        <img
                            src={item.image} 
                            alt={item.name}
                            className="h-full w-full object-cover transform hover:scale-105 transition duration-500" 
                        />
                    </div>

                    <div className="p-4 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-base">{item.name}</h3>
                            <p className="text-gray-500 text-xs mt-1 leading-normal mb-3 line-clamp-2">{item.description}</p>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <p className="text-orange-600 font-bold text-lg">LKR {item.price}</p> 

                            <button
                                onClick={() => addToCart(item)}
                                className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition duration-150"
                            >
                                <FaPlus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
      </div>
        
    );
}