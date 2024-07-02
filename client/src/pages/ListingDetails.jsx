import React, { useEffect, useState } from "react";
import "../styles/ListingsDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import { useSelector } from "react-redux";
import Footer from "../Components/Footer.jsx";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Components/Loader.jsx";
import Navbar from "../Components/Navbar.jsx";


const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [Owner_email, setOwner_email] = useState("");

  useEffect(() => {
    const getListingDetails = async () => {
      try {
        const response = await fetch(
          `https://home-hive-1.onrender.com/Home-Hive/properties/${listingId}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        setListing(data);
        const { Email } = data;
        setOwner_email(Email);
        setLoading(false);
      } catch (err) {
        console.log("Fetch Listing Details Failed", err.message);
      }
    };

    getListingDetails();
  }, [listingId]);

  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when the user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in days

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        Owner_email,
      };

      const response = await fetch(
        "https://home-hive-1.onrender.com/Home-Hive/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingForm),
        }
      );

      if (response.ok) {
        // Email sent successfully
        toast.success("Email sent successfully");
        // Optionally, you can navigate to another page or perform any other action here
      } else {
        // Email sending failed
        toast.error("Failed to send email. Please try again later.");
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
      toast.error("Failed to send email. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="listing-details">
            <div className="title">
              <h1 className="heading">{listing.title}</h1>
              <div></div>
            </div>
            <div className="photos">
              {listing.listingPhotoPaths?.map((item) => (
                <img
                  src={`https://home-hive-1.onrender.com/${item.replace("public", "")}`}
                  alt="listing photo"
                />
              ))}
            </div>
            <h2>
              {listing.type} in {listing.city}
            </h2>
            <p>
              {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
              {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
            </p>
            <hr />
  
            <div className="profile">
              <img
                src={`https://home-hive-1.onrender.com/${listing.creator.profileImagePath.replace(
                  "public",
                  ""
                )}`}
              />
              <h3 className="owner">
                Hosted by {listing.creator.firstName} {listing.creator.lastName}
                <br />
                Email: {listing.Email}
                <br />
                PhoneNumber: {listing.PhoneNumber}
              </h3>
            </div>
            <hr />
  
            <h3>Description</h3>
            <p>{listing.description}</p>
            <hr />
  
            <h3>{listing.highlight}</h3>
            <p>{listing.highlightDesc}</p>
            <hr />
  
            <div className="booking">
              <div>
                <h2>What this place offers?</h2>
                <div className="amenities">
                  {listing.amenities[0].split(",").map((item, index) => (
                    <div className="facility" key={index}>
                      <div className="facility_icon">
                        {facilities.find((facility) => facility.name === item)
                          ?.icon}
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
  
              <div>
                <h2 className="font-extrabold text-2xl">
                  Did you like the property?
                </h2>
                <br />
                <br />
                <h1 className="font-bold text-xl">
                  Click on the Request Booking button to send
                  <br />
                  mail request to the owner of the property.
                </h1>
                <div className="date-range-calendar">
                  {/* <DateRange ranges={dateRange} onChange={handleSelect} />
                  {dayCount > 1 ? (
                    <h2>
                      ${listing.price} x {dayCount} nights
                    </h2>
                  ) : (
                    <h2>
                      ${listing.price} x {dayCount} night
                    </h2>
                  )}
  
                  <h2>Total price: ${listing.price * dayCount}</h2>
                  <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
                  <p>End Date: {dateRange[0].endDate.toDateString()}</p> */}
                  <button
                    className="button"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    REQUEST BOOKING
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
  export default ListingDetails;