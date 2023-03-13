import React from "react";
import { useState } from "react";
import "../index.css";
import "../config.js";

const FoodSearch = () => {
  const [inputText, setInputText] = useState("");
  const [recipes, setRecipes] = useState([]);

  let inputHandler = (e) => {
    setInputText(e.target.value);
  };

  // call API to get recipes
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");
    fetch(global.config.api_url + "/search_recipes.php?query=" + inputText, {
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

          <button disabled={!inputText} id="foodSearchButton">
            Click me
          </button>
        </form>

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