const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Configure Passport.js Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Use "email" instead of the default "username"
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Authentication successful
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Save the user ID in the session
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Find the user by ID
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Register a New User
const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    // Check if the username already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login a User (using Passport.js)
const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred", error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "An error occurred during login" });
      }
      console.log("Session created for user");
      res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

// Logout a User
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};

// Check if the User is Authenticated
const checkSession = (req, res) => {
  console.log("Check session request received");
  if (req.isAuthenticated()) {
    console.log("req.isAuthenticated:", req.isAuthenticated());
    console.log("Session is active");
    res.status(200).json({ message: "Session is active", user: req.user });
  } else {
    console.log("Session is not active");
    res.status(401).json({ message: "Session is not active" });
  }
};

module.exports = { registerUser, loginUser, logoutUser, checkSession };
