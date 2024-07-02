import express from "express";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth.route.js";
import ListingRoutes  from "./routes/Listing.route.js";
import BookingRoutes from "./routes/booking.route.js";
import UserRoutes from "./routes/user.route.js"
import mongoose from "mongoose";
import cors from "cors";

// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

dotenv.config({ path: "./.env" });

const app = express();

// app.use(express.static(join(__dirname, '../client/build')));

// app.use((req, res, next) => {
//   res.sendFile(join(__dirname, '../client/build', 'index.html'));
// });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => res.send("Home hive is live"));

app.use("/Home-Hive/auth", AuthRoutes);
app.use("/Home-Hive/properties",ListingRoutes);
app.use("/Home-Hive/bookings",BookingRoutes);
app.use("/Home-Hive/users",UserRoutes);

// Mongoose Setup
const PORT = process.env.PORT || 3000;

const main = () => {
  try {
    mongoose.connect(process.env.MONGO_DB, {
      dbName:"Home-Hive",
      // Remove deprecated options and add retryWrites and w options
      useNewUrlparser: true,
      useUnifiedTopoLogy: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

main();
