import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HomeScreen from '../components/HomeScreen'
import CategoryCard from '../components/CategoryCard'
import MenuGrid from '../components/MenuGrid' // Swapped from DishCard
import Footer from '../components/Footer'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [popularItems, setPopularItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      // Using native fetch instead of axios
      const [catRes, menuRes] = await Promise.all([
        fetch('http://localhost:5000/api/categories'),
        fetch('http://localhost:5000/api/menu') // Assuming this is your endpoint
      ])

      const catData = await catRes.json()
      const menuData = await menuRes.json()

      // Set categories from DB or fallback
      if (catData && catData.length > 0) {
        setCategories(catData)
      } else {
        setCategories([
          { name: 'Burgers', count: 10, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', popular: true },
          { name: 'Pizza', count: 16, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', popular: true },
          { name: 'Salads', count: 14, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', popular: false },
          { name: 'Desserts', count: 5, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80', popular: false }
        ])
      }

      // Filter popular items for the home page display
      const popular = menuData.filter(item => item.isPopular).slice(0, 4)
      setPopularItems(popular.length > 0 ? popular : menuData.slice(0, 4))

    } catch (error) {
      console.error("Error fetching home data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HomeScreen />
      
      {/* Browse Categories */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Browse Categories</h3>
              <p className="text-gray-600">Explore our delicious food categories</p>
            </div>
            <a href="/menu" className="text-orange-600 hover:underline font-semibold">View all</a>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <CategoryCard key={index} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Menu Items (Using MenuGrid) */}
      {/* Featured Menu Items (Using MenuGrid) */}
<section className="py-10 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-8">
      <h3 className="text-3xl font-bold text-gray-800 mb-2">Popular Hits</h3>
      <p className="text-gray-600">Our customers' favorites right now</p>
    </div>
    
    {loading ? (
        <div className="text-center py-10">Loading menu...</div>
    ) : (
      /* REMOVED the extra grid wrapper here to fix the squashed cards */
      <MenuGrid items={popularItems} /> 
    )}
    
    <div className="mt-12 text-center">
        <a href="/menu" className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition">
          Explore Full Menu
        </a>
    </div>
  </div>
</section>

      {/* About Section */}
      <section className="py-16 bg-cover bg-center relative" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&q=80)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6 italic">Flavor Town</h2>
          <p className="text-lg leading-relaxed mb-8">
            Born in the kitchen, not the boardroom. Since 2017, we've been serving up fresh ingredients and unforgettable flavors.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home