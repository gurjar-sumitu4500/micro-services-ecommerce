// server.js

// Import required dependencies
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const errorHandler = require("./src/utils/errorHandler");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const AuthStrategy = require('passport-auth0');
const session = require('express-session');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser());
app.use(session({
  secret: 'MyAppSecretsdhfjhdfjdf',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new AuthStrategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL
},(accessToken, refreshToken, extraParams, profile, done)=>{
  return done(null, profile);
}))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
})

app.get('/login', passport.authenticate('authO', {scope: 'openid email profile'}), (req, res) => {
  res.redirect('/');
})

app.get('/login/google', passport.authenticate('authO', {connection: 'google-oauth2'}), (req, res) => {
  res.redirect('/');
})

app.get('/auth/callback', passport.authenticate('authO', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/');
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

app.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.send(`Welcome, ${req.user.displayName || req.user.username}`);
  }else{
    res.redirect('/login');
  }
})

// Database Connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("\x1b[32m%s\x1b[0m", "🌱 Connected to the database");
  })
  .catch((error) => {
    console.error("\x1b[31m%s\x1b[0m", "❌ Database connection failed:", error.message,
    );
    process.exit(1); // Exit the process if database connection fails
  });



// app.use("/api/auth", authRoutes);
// app.use("/api/auth", userRoutes);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log("\x1b[34m%s\x1b[0m", `🚀 Server is running on port ${PORT}`);
});

// Graceful process exit for unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("\x1b[31m%s\x1b[0m", "❌ Unhandled Rejection:", err.message);
  server.close(() => {
    mongoose.connection.close(() => {
      process.exit(1); // Exit process with error
    });
  });
});

// Graceful process exit
process.on("SIGINT", () => {
  mongoose.connection.close();
  console.log(
    "\x1b[31m%s\x1b[0m",
    "🚫 Server is closed through app termination!",
  );
  console.log(
    "\x1b[31m%s\x1b[0m",
    "🚫 MongoDB connection disconnected through app termination!",
  );
  process.exit(0); // Exit process
});