import React from "react";
import { useEffect, useState } from "react";
import { categories } from "../data.js";
import "../styles/Listings.css"
import ListingCard from "./ListingCard.jsx";
import Loader from "./Loader.jsx"
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // used to select the reducers
  const listings = useSelector((state) => state.listings);

  // we are fetching it using http://localhost:5000/Home-Hive/properties api endpoint but with category filter 
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `https://home-hive-1.onrender.com/Home-Hive/properties?category=${selectedCategory}`
          : "https://home-hive-1.onrender.com/Home-Hive/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // new data dispatched to listing reducer
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.slice(0, 10).map((category, index) => (
          <div
          // if we click on any of the react-icon toh classname = "categoryselected"
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            // label is the name of the category
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {/* listing will have new fecthed data as the state is updated */}
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking=false
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;