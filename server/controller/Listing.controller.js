import { Listing } from "../model/Listing.model.js";
// import { User } from "../model/user.model.js";

// Become a Host and  category based property showing

/* CREATE LISTING */
const CreateListing = async (req, res) => {
  // Extract all data sent from the frontend Listing details form
  try {
    // Destructure necessary fields from the request body
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      Email,
      PhoneNumber,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    // Extract uploaded listing photos from the request
    const listingPhotos = req.files;

    // Check if listing photos are uploaded
    if (!listingPhotos) {
      // If no photos are uploaded, send a 400 error response
      return res.status(400).send("No file uploaded.");
    }

    // Extract file paths from the uploaded listing photos
    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    // Create a new instance of the Listing model with the extracted data
    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      Email,
      PhoneNumber,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    // Save the newly created listing to the database
    await newListing.save();

    // Send a successful response with status code 200 and the newly created listing in JSON format
    res.status(200).json(newListing);
  } catch (err) {
    // If an error occurs during the process, send a response with status code 409 (Conflict)
    // along with a JSON object containing an error message
    res
      .status(409)
      .json({ message: "Fail to create Listing", error: err.message });
    // Log the error for debugging purposes
    console.log(err);
  }
};
const GetListing = async (req, res) => {
  // Extract the category query parameter from the request
  // this is used in the case of react-icons and this will not be included in the route itself
  // const response = await fetch(
  //   selectedCategory !== "All"
  //   ? `http://localhost:5000/Home-Hive/properties?category=${selectedCategory}`
  //   This is persent in Listing.jsx this is the key value pair and we will get the value of the category with the help of
  // req.query.category;

  //   : "http://localhost:5000/Home-Hive/properties",
  // {
  //   method: "GET",
  // }
  const qCategory = req.query.category;

  try {
    let listings;

    // Check if a category query parameter is provided
    if (qCategory) {
      // If a category query parameter is provided, find listings by that category and populate the "creator" field
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      // If no category query parameter is provided, fetch all listings and populate the "creator" field
      listings = await Listing.find().populate("creator");
    }

    // Send a successful response with status code 200 and the fetched listings in JSON format
    res.status(200).json(listings);
  } catch (err) {
    // If an error occurs during the process, send a response with status code 404 (Not Found)
    // along with a JSON object containing an error message
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    // Log the error for debugging purposes
    console.log(err);
  }
};

/* GET LISTINGS BY SEARCH */
const GetListingBySearch = async (req, res) => {
  const { search } = req.params;
  try {
    let listings = [];
    // Check if the search parameter is 'all'
    if (search === "all") {
      // If 'all', retrieve all listings from the database and populate the 'creator' field
      listings = await Listing.find().populate("creator");
    } else {
      // If search parameter is not 'all', perform a filtered search based on category or title
      listings = await Listing.find({
        // Using $or operator to match documents that satisfy at least one of the conditions
        $or: [
          // Using regular expression to perform case-insensitive search on category
          { category: { $regex: search, $options: "i" } },
          // Using regular expression to perform case-insensitive search on title
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    // Sending the retrieved listings as a JSON response
    res.status(200).json(listings);
  } catch (err) {
    // Handling errors by sending a 404 status code along with an error message
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err); // Logging the error for debugging purposes
  }
};

const GetListingById = async (req, res) => {
  try {
    // Extract the listingId parameter from the request parameters
    const { listingId } = req.params;

    // Find the listing by its ID and populate the "creator" field
    const listing = await Listing.findById(listingId).populate("creator");

    // Send a successful response with status code 202 (Accepted) and the fetched listing in JSON format
    res.status(202).json(listing);
  } catch (err) {
    // If an error occurs during the process, send a response with status code 404 (Not Found)
    // along with a JSON object containing an error message
    res
      .status(404)
      .json({ message: "Listing can not found!", error: err.message });
  }
};

export { CreateListing, GetListing, GetListingById, GetListingBySearch };
