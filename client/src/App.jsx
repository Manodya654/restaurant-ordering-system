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

// // client/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminMenu.jsx'; 
import Menu from './pages/Menu.jsx'; 
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import AdminCategories from './pages/Admin/AdminCategories.jsx';
import AdminLogin from './pages/Admin/AdminLogin.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Menu />} /> 
            <Route path="/menu" element={<Menu />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            
            {/* Admin Route */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/menu" element={<AdminDashboard />} />
            <Route path="/admin/categories" element={<AdminCategories />} />

            
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;