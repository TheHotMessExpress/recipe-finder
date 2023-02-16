import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import '../index.css';
import '../config.js';

const FoodSearch = () => {
  const [inputText, setInputText] = useState("");
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
      if(response['success'] == true){
        // check results length
        if(response['data'].length > 0){
          // display each result
          for(let i = 0; i < response['data'].length; i++){
            // response['data'][i]['title']
          }
        }else{
          // display no results msg
        }
      }else{
        // display error msg
      }
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="main">
      <h1>This is "FoodSearch" Page</h1>

      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField className="search"
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"/>

          <button disabled={!inputText} class="FoodSearchButton">Click me</button>
        </form>
      </div>

      <div className="foodSearch">
      Recipes:    
      </div>
    </div>
  );
}

export default FoodSearch;