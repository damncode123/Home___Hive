import "../styles/WishList.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar.jsx";
import ListingCard from "../Components/ListingCard.jsx";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../Components/Loader.jsx";
import Footer from "../Components/Footer.jsx"

const PropertyList = () => {
    const [loading, setLoading] = useState(true)
    const user = useSelector((state) => state.user)
    const propertyList = user?.propertyList;
    console.log(user)
  
    const dispatch = useDispatch()
    const getPropertyList = async () => {
      try {
        const response = await fetch(`https://home-hive-1.onrender.com/Home-Hive/users/${user._id}/properties`, {
          method: "GET"
        })
        const data = await response.json()
        console.log(data)
        dispatch(setPropertyList(data))
        setLoading(false)
      } catch (err) {
        console.log("Fetch all properties failed", err.message)
      }
    }
  
    useEffect(() => {
      getPropertyList()
    }, [])
  
    return loading ? <Loader /> : (
      <>
        <Navbar />
        <h1 className="title-list">Your Property List</h1>
        <div className="list">
          {propertyList?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              Email,
              Phonenumber,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                Email={Email}
                Phonenumber={Phonenumber}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
  
        <Footer />
      </>
    );
  };
  
  export default PropertyList;