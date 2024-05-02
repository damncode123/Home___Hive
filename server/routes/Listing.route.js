import { Router } from "express";
import multer from "multer";
import {
  CreateListing,
  GetListing,
  GetListingById,
  GetListingBySearch,
} from "../controller/Listing.controller.js";
// User routes
const Listing = Router();
/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // Use the original file name
  },
});
const upload = multer({ storage });
// This is used to create the new property
Listing.post("/create", upload.array("listingPhotos"), CreateListing);
// this is used to filter on the basis of the react-icons : -
Listing.get("/", GetListing);
// this is the route which is comes in used when we try to book any property there we make use of listing id of the property
Listing.get("/:listingId", GetListingById);
Listing.get("/search/:search", GetListingBySearch);
export default Listing;
