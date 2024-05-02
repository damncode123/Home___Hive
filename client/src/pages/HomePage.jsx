 import React from 'react'
 import Navbar from '../Components/Navbar.jsx'
 import Slide from '../Components/Slide.jsx'
 import Categories from "../Components/Category.jsx"
 import Listings from '../Components/Listings.jsx'
import Footer from '../Components/Footer.jsx'
 const HomePage = () => {
   return (
     <div>
       <Navbar/>
       <Slide/>
       <Categories/>
       <Listings/>
       <Footer/>
     </div>
   )
 }
 
 export default HomePage;
 