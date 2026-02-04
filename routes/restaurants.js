const express = require("express");
const router = express.Router();

const Restaurant = require("../models/Restaurant");

/**
 * GET all restaurants
 */
router.get("/", async (req, res) => {
  try {
    const data = await Restaurant.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get restaurants by cuisine
router.get("/cuisine/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;

    const data = await Restaurant.find({ cuisine });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
