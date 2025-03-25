const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

const app = express();

// Import Routes
const userRoutes = require("./routes/user.routes");
const recipeRoutes = require("./routes/recipe.routes");

// Import Passport Configuration
require("./controllers/user.controller"); // Ensure Passport.js is configured

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173/", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set `secure: true` if using HTTPS
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use Routes
app.use("/api/user", userRoutes);
app.use("/api/recipes", recipeRoutes);

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
