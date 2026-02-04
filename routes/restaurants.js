const express = require("express");
const router = express.Router();

const Restaurant = require("../models/Restaurant");

/**
 * GET all restaurants
 */
router.get("/", async (req, res) => {
  try {
    const sortBy = req.query.sortBy;

    // If no sorting, return all
    if (!sortBy) {
      const data = await Restaurant.find();
      return res.json(data);
    }

    const order = sortBy === "DESC" ? -1 : 1;

    const data = await Restaurant.find(
      {},
      {
        _id: 1,
        cuisine: 1,
        name: 1,
        borough: 1,
        restaurant_id: 1,
      },
    ).sort({ restaurant_id: order });

    const result = data.map((r) => ({
      id: r._id,
      cuisines: r.cuisine,
      name: r.name,
      city: r.borough,
      restaurant_id: r.restaurant_id,
    }));

    res.json(result);
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

// Delicatessen and not Brooklyn
router.get("/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;

    const data = await Restaurant.find(
      {
        cuisine: cuisine,
        borough: { $ne: "Brooklyn" },
      },
      {
        _id: 0,
        cuisine: 1,
        name: 1,
        borough: 1,
      },
    ).sort({ name: 1 });

    const result = data.map((r) => ({
      cuisines: r.cuisine,
      name: r.name,
      city: r.borough,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
