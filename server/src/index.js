// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from "express";
import pg from "pg";
import config from "./config.js";

const db = new pg.Pool({
  connectionString: config.databaseUrl + "&uselibpqcompat=true",
  ssl: true,
});

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllFoodTrucks()
async function getAllFoodTrucks() {
  const result = await db.query("SELECT * FROM food_trucks");
  return result.rows;
}

// 2. getFoodTruckById(id)
async function getFoodTruckById(id) {
  const result = await db.query("SELECT * FROM food_trucks WHERE id = $1" , [id]);
  return result.rows[0];
}

// 3. getVeganFoodTrucks()

// 4. getFoodTrucksByPrice(price)

// 5. getTopRatedFoodTrucks()

// 6. getFoodTrucksSortedByRating()

// 7. getFoodTrucksSortedByPrice()

// 8. getFoodTrucksCount()

// 9. addOneFoodTruck(...)
async function addOneFoodTruck(
  name,
  current_location,
  daily_special,
  slogan,
  has_vegan_options,
  price_level,
  rating,
) {
  const result = await db.query(
    `INSERT INTO food_trucks
     (name, current_location, daily_special, slogan, has_vegan_options, price_level, rating)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      name,
      current_location,
      daily_special,
      slogan,
      has_vegan_options,
      price_level,
      rating,
    ],
  );

  return result.rows[0];
}

// 10. deleteOneFoodTruck(id)

// 11. updateFoodTruckLocation(id, newLocation)

// 12. updateFoodTruckRating(id, newRating)

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-food-trucks
app.get("/get-all-food-trucks", async (req, res) => {
  const trucks = await getAllFoodTrucks();
  res.json(trucks);
});

// 2. GET /get-food-truck-by-id/:id - Carlotta
app.get("/get-food-truck-by-id/:id", async (req,res) => {
  const { id } = req.params;
  const truck = await getFoodTruckById(id);
  if (truck) {
    res.json(truck);
  } else {
    res.send(`Food truck with ID ${id} not found.`);
  }
})

// 3. GET /get-vegan-food-trucks - Jana

// 4. GET /get-food-trucks-by-price/:price - Hailey

// 5. GET /get-top-rated-food-trucks - Arianne

// 6. GET /get-food-trucks-sorted-by-rating - Morgan

// 7. GET /get-food-trucks-sorted-by-price - Ysabel

// 8. GET /get-food-trucks-count - Meribel

// 9. POST /add-one-food-truck - Shirley
app.post("/add-one-food-truck", async (req, res) => {
  const {
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  } = req.body;

  const truck = await addOneFoodTruck(
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  );

  res.send(`Success! ${truck.name} was added!`);
});

// 10. POST /delete-one-food-truck/:id - Seth

// 11. POST /update-food-truck-location - Arianne

// 12. POST /update-food-truck-rating - BONUS!

