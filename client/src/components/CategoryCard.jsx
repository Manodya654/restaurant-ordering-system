import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/menu?category=${category.name}`} className="group block"> 
      <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full aspect-square">
        <div className="aspect-square overflow-hidden">
          <img
            src={category.image || 'https://via.placeholder.com/400'} // 
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <h3 className="text-white text-lg font-bold">{category.name}</h3>
          <p className="text-white/80 text-xs">{category.count || 0} items</p>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard