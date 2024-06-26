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

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

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

app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
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