import { FaPlus, FaStar } from "react-icons/fa" // Import FaStar for the "Popular" tag

// ... (Imports and items array remain the same)
import burger from "../assets/burger.jpg"
import pizza from "../assets/pizza.jpg"
import vegan from "../assets/vegan.jpg"
import cake from "../assets/cake.jpg"
import asian from "../assets/asian.jpg"

const items = [
    // I've updated the prices to reflect the $xx.xx format seen in the image
    // You can revert this if LKR is required for your final app.
    {
      name: "Classic Beef Burger",
      description: "Juicy beef patty with lettuce, tomato, onions, pickles, and our special sauce", // Added description for the card body
      price: "$12.99", // Updated price format
      img: burger,
      category: "Burgers",
      isPopular: true, // Added a flag for the "Popular" tag
    },
    {
      name: "Margherita Pizza",
      description: "Fresh mozzarella, tomato sauce, and basil on our homemade dough", // Added description
      price: "$14.99", // Updated price format
      img: pizza,
      category: "Pizza",
      isPopular: true, // Added a flag
    },
    {
      name: "Creamy Carbonara",
      description: "Traditional Italian pasta with eggs, cheese, pancetta, and black pepper", // Added description
      price: "$16.99", // Updated price format
      img: vegan,
      category: "Non-Vegan",
      isPopular: true, // Added a flag
    },
    {
      name: "Chocolate Lava Cake",
      description: "Rich chocolate cake with a molten chocolate center, served with vanilla ice...", // Added description
      price: "$7.99", // Updated price format
      img: cake,
      category: "Desserts",
      isPopular: true, // Added a flag
    },
    {
      name: "Fresh Juice",
      description: "A blend of fresh seasonal fruits",
      price: "LKR 1200",
      img: asian,
      category: "Drinks",
      isPopular: false,
    },
    {
      name: "Fresh Juice",
      description: "A blend of fresh seasonal fruits",
      price: "LKR 1200",
      img: asian,
      category: "Drinks",
      isPopular: false,
    },
]

export default function MenuGrid({ selectedCategory }) {
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory)

  const addToCart = (item) => {
    alert(`${item.name} added to cart`)
  }

  return (
    <section className="px-8 mt-8 grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredItems.length === 0 && (
        <p className="text-gray-500">No items found</p>
      )}

      {filteredItems.map((item, index) => (
        <div
          key={index}
          // Card Styling: White background, rounded corners, slight shadow, and hover effect
          className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:ring-2 hover:ring-orange-500 cursor-pointer relative" 
        >
            {/* POPULAR TAG */}
            {item.isPopular && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <FaStar className="w-3 h-3 text-white"/>
                    Popular
                </div>
            )}
            
            {/* Image Container */}
            <div className="h-40 w-full overflow-hidden rounded-t-xl">
                <img
                    src={item.img}
                    alt={item.name}
                    // Adjusted height to h-full to fill the div, but overall height is controlled by parent div
                    className="h-full w-full object-cover transform hover:scale-105 transition duration-500" 
                />
            </div>

            <div className="p-4 flex flex-col justify-between">
                {/* Title and Description */}
                <div>
                    <h3 className="font-bold text-base">{item.name}</h3>
                    <p className="text-gray-500 text-xs mt-1 leading-normal mb-3">{item.description}</p>
                </div>

                {/* Price and Button (Bottom Row) */}
                <div className="flex justify-between items-center mt-2">
                    {/* Price */}
                    <p className="text-orange-600 font-bold text-lg">{item.price}</p> 

                    {/* Button: Small, round, orange button with FaPlus */}
                    <button
                        onClick={() => addToCart(item)}
                        // bg-orange-500, rounded-full, fixed size (w-8 h-8), center content
                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition duration-150"
                    >
                        <FaPlus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
      ))}
    </section>
  )
}