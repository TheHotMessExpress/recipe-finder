import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import '../index.css';
import '../config.js';

const FoodSearch = () => {
  const [inputText, setInputText] = useState("");
  const [recipes, setRecipes] = useState([]);

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  // call API to get recipes
      const handleSubmit = (event) => {
      console.log("handleSubmit called");
      event.preventDefault();
       fetch(global.config.api_url+"/search_recipes.php?query="+inputText, {
         "method": "GET",
         "headers": {
           "content-type": "text/plain",
           "accept": "application/json"
         }
       })
       .then(response => response.json())
       .then(response => {
         console.log(response);
         // display recipes
         if(response['success'] === true){
           // check results length
           if(response['data'].length > 0){
             // display each result
             for(let i = 0; i < response['data'].length; i++){
               setRecipes(response['data'][i]['title']);
             }
           }else{
             // display no results msg - will come back to error messages
           }
         }else{
           // display error msg
         }
       })
       .catch(err => {
         console.log(err);
       });
     };


    // call API to get recipes
    // const handleSubmit = (event) => {
    //   console.log("handleSubmit called");
    //   event.preventDefault();
    //    fetch(global.config.api_url+"/search_recipes.php?query="+inputText, {
    //      "method": "GET",
    //      "headers": {
    //        "content-type": "text/plain",
    //        "accept": "application/json"
    //      }
    //    })
    //    .then(response => response.json())
    //    .then(response => {
    //      console.log(response);
    //      // display recipes
    //      if(response['success'] == true){
    //        // check results length
    //        if(response['data'].length > 0){
    //          // display each result
    //          for(let i = 0; i < response['data'].length; i++){
    //            // response['data'][i]['title']
    //          }
    //        }else{
    //          // display no results msg
    //        }
    //      }else{
    //        // display error msg
    //      }
    //    })
    //    .catch(err => {
    //      console.log(err);
    //    });
    //  };

  return (
    <div className="main">
      <h1>This is "FoodSearch" Page</h1>

      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>

          {/* Commented out because it makes the page blank, working with the input field below instead - not sure if this is tied to the issue? */}
          {/* <TextField className="search"
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"/> */}

          <input className="search" type="text" onChange={inputHandler} placeholder="Search"  />

          <button disabled={!inputText} className="foodSearchButton">Click me</button>
        </form>

        <div id="recipe-results" className="searchResults">
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image}/>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default FoodSearch;