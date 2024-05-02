import {Router} from "express"
import {AddToWishlist , PropertiesList } from "../controller/user.controller.js";
const User= Router();
User.patch("/:userId/:listingId",AddToWishlist)
User.get("/:userId/properties",PropertiesList)
export default User;