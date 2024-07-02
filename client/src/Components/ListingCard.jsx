import React from 'react'
import { useState } from 'react';
import "../styles/ListingCard.css"
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
   /* SLIDER FOR IMAGES */
   const [currentIndex, setCurrentIndex] = useState(0);

   const goToPrevSlide = () => {
     setCurrentIndex(
       (prevIndex) =>
         (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
     );
   };
 
   const goToNextSlide = () => {
     setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
   };
   const navigate = useNavigate();
   const dispatch = useDispatch();
 
   /* ADD TO WISHLIST */
   const user = useSelector((state) => state.user);
  //   getting error when no user is logged in then state.user will give me error .
  // So, if(user is null the wishlist is null).
   const wishList = user?.wishList || [];
 
   const isLiked = wishList?.find((item) => item?._id === listingId);
 
   const patchWishList = async () => {
    //  To avoid the like of the owner of the property itself.
     if (user?._id !== creator._id) {
     const response = await fetch(
       `https://home-hive-1.onrender.com/Home-Hive/users/${user?._id}/${listingId}`,
       {
         method: "PATCH",
         header: {
           "Content-Type": "application/json",
         },
       }
     );
     const data = await response.json();
     dispatch(setWishList(data.wishList));
   } else { return }
   };
 
   return (
     <div
       className="listing-card"
       onClick={() => {
         navigate(`/properties/${listingId}`);
       }}
     >
       <div className="slider-container">
         <div
           className="slider"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
         >
           {listingPhotoPaths?.map((photo, index) => (
             <div key={index} className="slide">
               <img
                 src={`https://home-hive-1.onrender.com/${photo?.replace("public", "")}`}
                 alt={`photo ${index + 1}`}
               />
               <div
                 className="prev-button"
                 onClick={(e) => {
                   e.stopPropagation();
                   goToPrevSlide(e);
                 }}
               >
                 <ArrowBackIosNew sx={{ fontSize: "15px" }} />
               </div>
               <div
                 className="next-button"
                 onClick={(e) => {
                  // to stop event bubbling
                   e.stopPropagation();
                   goToNextSlide(e);
                 }}
               >
                 <ArrowForwardIos sx={{ fontSize: "15px" }} />
               </div>
             </div>
           ))}
         </div>
       </div>
 
       <h3>
         {city}, {province}, {country}
       </h3>
       <p>{category}</p>
 
       {!booking ? (
         <>
           <p>{type}</p>
           <p>
             <span>₹{price}</span> per month
           </p>
         </>
       ) : (
         <>
           <p>
             {startDate} - {endDate}
           </p>
           <p>
             <span>${totalPrice}</span> total
           </p>
         </>
       )}
 
       <button
         className="favorite"
         onClick={(e) => {
           e.stopPropagation();
           patchWishList();
         }}
         disabled={!user}
       >
         {isLiked ? (
           <Favorite sx={{ color: "red" }} />
         ) : (
           <Favorite sx={{ color: "white" }} />
         )}
       </button>
     </div>
   );
 };
 
 export default ListingCard;