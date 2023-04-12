import React from "react";
import { useState } from "react";
import "../index.css";
import "../config.js";
import notebook from "../images/notebook.png";

//import notebook from "../images/notebook.png";


const FoodSearch = () => {
  const [inputText, setInputText] = useState("");
  const [useIngredients, setUseIngredients] = useState(0);
  const [recipes, setRecipes] = useState([]);

  const [selectedDiet, setSelectedDiet] = useState('');

  const handleDietChange = (event) => {
    const value = event.target.value;
    setSelectedDiet(value);
  };

  let inputHandler = (e) => {
    setInputText(e.target.value);
  };

  // call API to get recipes
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");
    fetch(global.config.api_url + "/search_recipes.php?query=" + inputText + "&use_ingredients=" + useIngredients + "&selectedDiet=" + selectedDiet + "&token=" + localStorage.getItem("user_token"), {
      method: "GET",
      headers: {
        "content-type": "text/plain",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // display recipes
        if (response["success"] === true) {
          // check results length
          if (response["data"].length > 0) {
            // display each result
            for (let i = 0; i < response["data"].length; i++) {
              setRecipes(response["data"][i]);
            }
          } else {
            setRecipes([]);
          }
        } else {
          setRecipes([]);

          // see why it failed
          if(response['error']['message'] == "Empty User Pantry"){
            alert("You have no items in your pantry so you can't filter by ingredients.");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <body id="foodSearchDiv">
      <h1>This is "FoodSearch" Page</h1>

      <div>
        <form autoComplete="off" id="searchbar" onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            onChange={inputHandler}
            placeholder="Search"
          />
          <button disabled={!inputText} id="foodSearchButton" className="foodSearchButton">
            Search
          </button>
          <br/>
          <label for="ingredient_checkbox">Prioritize on-hand ingredients (in pantry)</label>
          <input
            type="checkbox"
            checked={useIngredients}
            onChange={function(e) {
              e.target.checked
                ? setUseIngredients(1)
                : setUseIngredients(0);
            }}
            id="ingredient_checkbox"
                  />
                  <br></br> <br></br> <br></br>
        </form>
            </div>
              <div id="recipe-results">

      {/* Dietary filtering */}

      <div id="dietFiltering">
      <label>
          <input
            type="radio"
            name="diet"
            value="vegan"
            onChange={handleDietChange}
            checked={selectedDiet === 'vegan'}
          />
          Vegan
        </label>
        <label>
          <input
            type="radio"
            name="diet"
            value="vegetarian"
            onChange={handleDietChange}
            checked={selectedDiet === 'vegetarian'}
          />
          Vegetarian
        </label>
        <label>
          <input
            type="radio"
            name="diet"
            value="gluten-free"
            onChange={handleDietChange}
            checked={selectedDiet === 'gluten-free'}
          />
          Gluten-Free
        </label>
        <label>
          <input
            type="radio"
            name="diet"
            value="keto"
            onChange={handleDietChange}
            checked={selectedDiet === 'keto'}
          />
          Keto
        </label>
                <label>
          <input
            type="radio"
            name="diet"
            value="dairy-free"
            onChange={handleDietChange}
            checked={selectedDiet === 'dairy-free'}
          />
          Dairy-Free
        </label>

      </div>


        <div id="recipe-results">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id}>
                <h3>{recipe.title}</h3>
                <div class="container">
                <img
                  id="searchResultsImage"
                  src={recipe.image}
                  alt={recipe.title}
                  onClick={function(){localStorage.setItem("recipe_id", recipe.id); window.location.href = "/some-recipe";}}
                />
                </div>
              </div>
            ))
          ) : (
            <p>No results to display</p>

                  )}

        </div>
      </div>
    </body>
  );
};

export default FoodSearch;