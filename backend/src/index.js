import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import { router } from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";

// Load environment variables
dotenv.config();

const app = express();

// ✅ Enable CORS for frontend (Vercel) + local dev
app.use(
  cors({
    origin: [process.env.ORIGIN_ACCESS_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Debug log (to confirm correct origin)
console.log("✅ Allowed Origin:", process.env.ORIGIN_ACCESS_URL);

// ✅ Parse JSON and cookies
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

// ✅ Connect to MongoDB Atlas
connectDB();

// ✅ API Routes
app.use("/api/v1/rent/user", router);
app.use("/api/v1/rent/listing", propertyRouter);
app.use("/api/v1/rent/user/booking", bookingRouter);

// ✅ Default Route (for testing backend live status)
app.get("/", (req, res) => {
  res.send("Homely-Hub Backend is running successfully 🚀");
});

// ✅ Server Setup
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 App running on port: ${port}`);
});
