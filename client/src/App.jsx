// import { useState } from "react"

// import Navbar from "./components/Navbar"
// import Hero from "./components/Hero"
// import Categories from "./components/Categories"
// import MenuGrid from "./components/MenuGrid"
// import Features from "./components/Features"
// import Footer from "./components/Footer"

// export default function App() {
//   const [selectedCategory, setSelectedCategory] = useState("All")

//   const SPACER_HEIGHT_CLASS = "h-20";

  
//   return (
//     <>
//       <Navbar />

//       <div className={SPACER_HEIGHT_CLASS}></div>
      
//       <main className="app-container">
//         <Hero />
//         <Categories
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />
//         <MenuGrid selectedCategory={selectedCategory} />
//       </main>

//       <Features />
//       <Footer />
//     </>
//   )
// }


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx'; 
import Menu from './pages/Menu.jsx'; 

function App() {
  return (
    <BrowserRouter>
      {/* Removed the unnecessary <Link> comments/placeholders */}
      <Routes>
        {/* Public Route (Your existing menu page) */}
        <Route path="/" element={<Menu />} /> 
        
        {/* Admin Route (Using a dedicated path for the Admin dashboard) */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Add more routes here (e.g., /history, /signup) */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;