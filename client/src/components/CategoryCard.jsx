import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/menu?category=${category.name}`} className="group block"> 
      {/* Reduced size by setting a max-width and changing aspect ratio if desired */}
      <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-[150px] mx-auto aspect-[5/5]">
        <div className="h-full w-full overflow-hidden">
          <img
            src={category.image || 'https://via.placeholder.com/400'} 
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
        
        {/* Slightly smaller text and padding for the smaller card */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
          <h3 className="text-white text-md font-bold leading-tight">{category.name}</h3>
          <p className="text-gray-200 text-[10px] font-medium mt-0.5">
             {category.itemCount || 0} items
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard