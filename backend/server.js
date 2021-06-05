const express = require("express");
const connectDB = require("./config/db");
const app = express();
//import routes
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const authRoutes = require("./routes/auth");
// Init Middleware
app.use(express.json());

//database connection
connectDB();

// Use Routes
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/auth", authRoutes);

//port connection

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
