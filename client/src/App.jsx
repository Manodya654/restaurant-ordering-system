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


// client/src/App.jsx

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx'; // Import the component
import Menu from './pages/Menu.jsx'; // Assuming your menu page is here

function App() {
  return (
    <BrowserRouter>
      {/* You can add a simple navigation bar here for testing.
        In a real app, you would hide the Admin link from public users.
      */}

      <Routes>
        {/* Public Route (Your existing menu page) */}
        <Route path="/" element={<Menu />} /> 
        
        {/* Admin Route (Your new page) */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Add more routes here (e.g., /history, /signup) */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;