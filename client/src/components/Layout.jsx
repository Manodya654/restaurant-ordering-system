// // client/src/components/Layout.jsx

// import Navbar from "./Navbar";
// import Footer from "./Footer"; 

// // This component accepts 'children' (the page content: Menu, Login, etc.)
// export default function Layout({ children }) {
//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar />
            
//             {/* KEY FIX: This wrapper pushes all 'children' (page content) down 
//               by pt-28 (112px) to clear the fixed Navbar.
//             */}
//             <main className="flex-grow pt-28">
//                 {children}
//             </main>
            
//             <Footer />
//         </div>
//     );
// }