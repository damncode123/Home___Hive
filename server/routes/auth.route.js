import { Router } from "express";
import multer from "multer";

import { Register, login } from "../controller/auth.controller.js";
// User routes
const AuthRoute = Router();
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
AuthRoute.post("/register", upload.single("profileImage"), Register);
AuthRoute.post("/login", login);

export default AuthRoute;
