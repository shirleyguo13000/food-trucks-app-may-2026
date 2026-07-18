import "../App.css";
import { useState, useEffect } from "react";

function Home() {
  const [foodtrucks, setFoodtrucks] = useState([]);
  const [foodtruckCount, setFoodtruckCount] = useState([]);

  const foodtruckAPI = async () => {
    try {
      const response = await fetch(`http://localhost:3000/get-all-food-trucks`);
      const data = await response.json();
      console.log("data", data);
      setFoodtrucks(data);
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  const countAPI = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/get-food-trucks-count`,
      );
      const data = await response.json();
      console.log("data", data);
      setFoodtruckCount(data);
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  useEffect(() => {
    foodtruckAPI();
  }, []);

  useEffect(() => {
    countAPI();
  }, []);

  return (
    <>
      <h1>All Food Trucks</h1>
      <h2>Total number of food trucks: {foodtruckCount} </h2>
      <div className="grid-container">
        {foodtrucks.map((foodtruck) => (
          <div key={foodtruck.id} className="truck-card">
            <h3>{foodtruck.name}</h3>
            <p className="info-row">
              <span className="static-p">Id:</span>
              <span className="dynamic-p">{foodtruck.id}</span>
            </p>
            <p className="info-row">
              <span className="static-p">Location:</span>
              <span className="dynamic-p">{foodtruck.current_location}</span>
            </p>
            <p className="info-row">
              <span className="static-p">Daily Special:</span>
              <span className="dynamic-p">{foodtruck.daily_special}</span>
            </p>
            <p className="info-row">
              <span className="static-p">Slogan:</span>
              <span className="dynamic-p">{foodtruck.slogan}</span>
            </p>
            <p className="info-row">
              <span className="static-p">Has vegan options:</span>
              <span className="dynamic-p">
                {foodtruck.has_vegan_options ? "Yes" : "No"}
              </span>
            </p>
            <p className="info-row">
              <span className="static-p">Price level:</span>
              <span className="dynamic-p">{foodtruck.price_level}</span>
            </p>
            <p className="info-row">
              <span className="static-p">Rating:</span>
              <span className="dynamic-p">{foodtruck.rating}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
