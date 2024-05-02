import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import WishList from "./pages/WishList.jsx";
import PropertyList from "./pages/PropertyList.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/:userId/:listingId" element={<WishList/>}/>
          <Route path="/users/:userId/properties" element={<PropertyList/>}/>
          <Route path="/properties/search/:search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
