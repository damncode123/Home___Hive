import { Router } from "express";
import {CreateBooking} from "../controller/booking.controller.js"
const Booking = Router();

Booking.post("/create",CreateBooking)
export default Booking;