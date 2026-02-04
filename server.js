require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
const restaurantRoutes = require("./routes/restaurants");

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
app.use("/api/restaurants", restaurantRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});
