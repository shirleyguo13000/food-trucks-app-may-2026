# 🚚 Food Trucks API Documentation

**Base URL:** `http://localhost:3000`

---

## Overview

| Number | Assignee  | Method | Endpoint                            | Description                                                 |
| ------ | --------- | ------ | ----------------------------------- | ----------------------------------------------------------- |
| 1      | None      | GET    | `/get-all-food-trucks`              | Retrieves all food trucks from the database.                |
| 2      | Carlotta   | GET    | `/get-food-truck-by-id/:id`         | Retrieves one food truck by its id number.                  |
| 3      | Jana   | GET    | `/get-vegan-food-trucks`            | Retrieves all food trucks that offer vegan options.         |
| 4      | Hailey   | GET    | `/get-food-trucks-by-price/:price`  | Retrieves food trucks that match a specific price level.    |
| 5      | Arianne   | GET    | `/get-top-rated-food-trucks`        | Retrieves food trucks with rating 4.5 or higher.            |
| 6      | Morgan   | GET    | `/get-food-trucks-sorted-by-rating` | Retrieves food trucks sorted by rating (highest first).     |
| 7      | Ysabel   | GET    | `/get-food-trucks-sorted-by-price`  | Retrieves food trucks sorted by price level (lowest first). |
| 8      | Meribel   | GET    | `/get-food-trucks-count`            | Retrieves the total number of food trucks in the database.  |
| 9      | Shirley       | POST   | `/add-one-food-truck`               | Adds a new food truck to the database.                      |
| 10     | Seth   | POST   | `/delete-one-food-truck/:id`        | Deletes one food truck by its id number.                    |
| 11     | Student   | POST   | `/update-food-truck-location`       | Updates the location of a food truck.                       |
| 12     | Student   | POST   | `/update-food-truck-rating`         | Updates the rating of a food truck.                         |

---

# Database Schema

```sql
CREATE TABLE food_trucks (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    current_location VARCHAR,
    daily_special VARCHAR,
    slogan VARCHAR,
    has_vegan_options BOOLEAN DEFAULT false,
    price_level INTEGER DEFAULT 2 CHECK (price_level BETWEEN 1 AND 5),
    rating DECIMAL(2,1) DEFAULT 4.0 CHECK (rating BETWEEN 0 AND 5)
);
```

These defaults make the database more beginner-friendly. If a request does not include `has_vegan_options`, `price_level`, or `rating`, PostgreSQL will automatically fill them with default values.

---

## Sample Seed Data

```sql
INSERT INTO food_trucks (name, current_location, daily_special, slogan, has_vegan_options, price_level, rating) VALUES
('Bert''s Beets', 'Farmer''s Market, Oak & 3rd', 'The Crimson Devastator — beet soup served inside of hollowed out beets', 'You WILL taste the earth.', true, 2, 4.3),
('Nacho Average Nacho', 'Parked outside the DMV on Elm St', 'The Existential Crisis — 4lbs of nachos with toppings you didn''t ask for but probably needed', 'You''ve been waiting two hours. You deserve this.', false, 3, 4.6),
('Wrapscallion', 'Business Park Lot C', 'The LinkedIn Wrap — grilled chicken, unsolicited advice, and a side of ''circling back''', 'Disrupting the wrap vertical since 2019.', true, 2, 3.9),
('Pita Party', 'Outside the gym on Maple Ave', 'The Plus One — stuffed pita with roasted veggies, tzatziki, and a second pita nobody invited but everyone was glad showed up', 'Everyone''s welcome. Especially carbs.', true, 2, 4.5),
('Grill Murray', 'Film festival grounds, West Pavilion', 'The Groundhog Day Special — same burger as yesterday. And the day before.', 'No one will ever believe you ate here.', false, 3, 3.8),
('Cluck Norris', 'Corner of Pain Ave and Delicious Blvd', 'The Roundhouse — a chicken sandwich so spicy it has its own criminal record', 'Heat so intense, it has a black belt.', false, 4, 3.7),
('Roll With It', 'Convention Center food court annex', 'The Commitment — a sushi burrito the size of a forearm that requires both hands and a life decision', 'You said you weren''t that hungry. We don''t believe you.', true, 4, 4.8),
('Fry Hard: With a Vengeance', 'Stadium parking lot, Gate 4', 'The Yippee-Ki-Fry — loaded waffle fries with pulled pork and ''I can''t believe this is legal'' sauce', 'Welcome to the fry, pal.', false, 3, 4.2),
('The Meltdown', 'Corner of Main & 5th, next to the pigeons', 'The Structural Failure — a grilled cheese so loaded with toppings it collapses before it reaches your mouth, served with soup for the aftermath', 'It will fall apart. That''s the point.', true, 2, 4.4),
('Batter Up', 'Downtown Arts District, Vine & 2nd', 'The Grand Slam — a savory waffle stacked with fried chicken, hot honey, and pickles, served with a tiny baseball helmet full of mac and cheese', 'Step up to the plate. We''re ready.', false, 3, 4.6);
```

---

# API Endpoints

---

## 🔹 1. GET `/get-all-food-trucks`

**Description:** Retrieves all food trucks stored in the database.

**Example Request URL:**  
`GET http://localhost:3000/get-all-food-trucks`

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Bert's Beets",
    "current_location": "Farmer's Market, Oak & 3rd",
    "daily_special": "The Crimson Devastator — beet soup served inside of hollowed out beets",
    "slogan": "You WILL taste the earth.",
    "has_vegan_options": true,
    "price_level": 2,
    "rating": 4.3
  }
]
```

---

## 🔹 2. GET `/get-food-truck-by-id/:id`

**Description:** Retrieves one food truck by its id number.

**Example Request URL:**  
`GET http://localhost:3000/get-food-truck-by-id/3`

**Example Response:**

```json
{
  "id": 3,
  "name": "Wrapscallion",
  "current_location": "Business Park Lot C",
  "daily_special": "The LinkedIn Wrap — grilled chicken, unsolicited advice, and a side of 'circling back'",
  "slogan": "Disrupting the wrap vertical since 2019.",
  "has_vegan_options": true,
  "price_level": 2,
  "rating": 3.9
}
```

---

## 🔹 3. GET `/get-vegan-food-trucks`

**Description:** Retrieves all food trucks that offer vegan options.

**Example Request URL:**  
`GET http://localhost:3000/get-vegan-food-trucks`

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Bert's Beets",
    "has_vegan_options": true
  },
  {
    "id": 4,
    "name": "Pita Party",
    "has_vegan_options": true
  }
]
```

---

## 🔹 4. GET `/get-food-trucks-by-price/:price`

**Description:** Retrieves food trucks that match a specific price level.

**Example Request URL:**  
`GET http://localhost:3000/get-food-trucks-by-price/2`

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Bert's Beets",
    "price_level": 2
  },
  {
    "id": 3,
    "name": "Wrapscallion",
    "price_level": 2
  }
]
```

---

## 🔹 5. GET `/get-top-rated-food-trucks`

**Description:** Retrieves food trucks with rating 4.5 or higher.

**Example Request URL:**  
`GET http://localhost:3000/get-top-rated-food-trucks`

**Example Response:**

```json
[
  {
    "id": 7,
    "name": "Roll With It",
    "rating": 4.8
  },
  {
    "id": 2,
    "name": "Nacho Average Nacho",
    "rating": 4.6
  },
  {
    "id": 10,
    "name": "Batter Up",
    "rating": 4.6
  },
  {
    "id": 4,
    "name": "Pita Party",
    "rating": 4.5
  }
]
```

---

## 🔹 6. GET `/get-food-trucks-sorted-by-rating`

**Description:** Retrieves food trucks sorted by rating from highest to lowest.

**Example Request URL:**  
`GET http://localhost:3000/get-food-trucks-sorted-by-rating`

**Example Response:**

```json
[
  {
    "id": 7,
    "name": "Roll With It",
    "rating": 4.8
  },
  {
    "id": 2,
    "name": "Nacho Average Nacho",
    "rating": 4.6
  }
]
```

---

## 🔹 7. GET `/get-food-trucks-sorted-by-price`

**Description:** Retrieves food trucks sorted by price level from lowest to highest.

**Example Request URL:**  
`GET http://localhost:3000/get-food-trucks-sorted-by-price`

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Bert's Beets",
    "price_level": 2
  },
  {
    "id": 3,
    "name": "Wrapscallion",
    "price_level": 2
  }
]
```

---

## 🔹 8. GET `/get-food-trucks-count`

**Description:** Retrieves the total number of food trucks in the database.

**Example Request URL:**  
`GET http://localhost:3000/get-food-trucks-count`

**Example Response:**

```json
{
  "count": 10
}
```

---

## 🔹 9. POST `/add-one-food-truck`

**Description:** Adds a new food truck to the database.

**Example Request URL:**  
`POST http://localhost:3000/add-one-food-truck`

**Example Request Body:**

```json
{
  "name": "Taco Typhoon",
  "current_location": "Pier 7",
  "daily_special": "Hurricane Tacos",
  "slogan": "Blow your taste buds away",
  "has_vegan_options": true,
  "price_level": 3,
  "rating": 4.1
}
```

**Example Response:**

```
Success! Taco Typhoon was added!
```

---

## 🔹 10. POST `/delete-one-food-truck/:id`

**Description:** Deletes one food truck by its id number.

**Example Request URL:**  
`POST http://localhost:3000/delete-one-food-truck/3`

**Example Response:**

```
Success! Wrapscallion was deleted!
```

---

## 🔹 11. POST `/update-food-truck-location`

**Description:** Updates the location of a food truck.

**Example Request URL:**  
`POST http://localhost:3000/update-food-truck-location`

**Example Request Body:**

```json
{
  "id": 2,
  "newLocation": "Downtown Plaza"
}
```

**Example Response:**

```
Success! The food truck location was updated!
```

---

## 🔹 12. POST `/update-food-truck-rating`

**Description:** Updates the rating of a food truck.

**Example Request URL:**  
`POST http://localhost:3000/update-food-truck-rating`

**Example Request Body:**

```json
{
  "id": 3,
  "newRating": 4.9
}
```

**Example Response:**

```
Success! The food truck rating was updated!
```
