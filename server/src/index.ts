import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// purpose of this is to go to client dist folder which has complied frontend static assets
// serve those static assets on the root of URL that the backend runs on
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);

// Catch all route
// passing any request to url that are not api endpoint
// letting react router dom package handle the routing of this request for us
// the reason of this is because some of the routes are behind conditional logic and won't be part of the static file (it is generated at request time)
// the add hotel route is behind conditional logic and it is a protected root it doesn't exist in the static file that are deploy
// for all the request the aren't API routes go the the index.html of the front end
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(7000, () => {
  console.log("Server is running on localhost:7000");
});
