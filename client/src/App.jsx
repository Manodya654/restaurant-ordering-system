import { useState } from "react"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Categories from "./components/Categories"
import MenuGrid from "./components/MenuGrid"
import Features from "./components/Features"
import Footer from "./components/Footer"

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const SPACER_HEIGHT_CLASS = "h-20";

  
  return (
    <>
      <Navbar />

      <div className={SPACER_HEIGHT_CLASS}></div>
      
      <main className="app-container">
        <Hero />
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <MenuGrid selectedCategory={selectedCategory} />
      </main>

      <Features />
      <Footer />
    </>
  )
}