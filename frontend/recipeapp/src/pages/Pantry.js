import React from "react";
import '../css/Pantry.css';
  
const Pantry = () => {
  loadIngredients();
  return (
    <div>
      <h1>
      Ingredients Pantry
      </h1>
      <div id="categories_container"> </div>
      <button id="save_ingredients" style={{display: 'none'}} onClick={saveIngredients}>Save</button>
    </div>
  );
};

// loads and displays ingredients from the backend
function loadIngredients(){
  // load data
  fetch(global.config.api_url + "/ingredient_information.php?token="+getUserToken(), {
    method: "GET",
    headers: {
      "content-type": "text/plain",
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // display 
      if (response["success"] === true) {
        displayIngredients(response["data"]);

        // show save button
        document.getElementById('save_ingredients').style.display = '';
      }else{
        alert("Unable to load ingredients");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// displays ingredients to html
function displayIngredients(data){
  // clear container
  document.getElementById("categories_container").innerHTML = "";

  // create categories
  for(let i = 0; i < data['categories'].length; i++){
    document.getElementById("categories_container").innerHTML += 
      '<div class="category"><h3>'+data['categories'][i]['name']+'</h3><div id="'+
      data['categories'][i]['id']+'_container"></div></div>';
  }

  // fill with ingredients
  for(let i = 0; i < data['ingredients'].length; i++){
    document.getElementById(data['ingredients'][i]['category_id']+"_container").innerHTML += 
      '<div class="ingredient"><input type="checkbox" id="ingredient_'+data['ingredients'][i]['id']+'" '+
      (data['ingredients'][i]['checked'] == 1 ? 'checked' : '') + '>'+
      data['ingredients'][i]['name']+'</input></div>';
  }
}

// saves the ingredients to the backend for the user, then redirects
function saveIngredients(){
  // hide button
  document.getElementById('save_ingredients').style.display = 'none';

  // get ingredients
  let ingredients = [];

  let ing_eles = document.getElementsByClassName("ingredient");
  
  for(let i = 0; i < ing_eles.length; i++){
    let checkbox = ing_eles[i].querySelectorAll('input')[0];
    
    if(checkbox.checked){
      // add id to list
      ingredients.push(checkbox.id.substring(11));
    }
  };

  // save
  fetch(global.config.api_url + "/update_user_pantry.php?user_token="+getUserToken()+"&ingredients="+JSON.stringify(ingredients), {
    method: "GET",
    headers: {
      "content-type": "text/plain",
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // display 
      if (response["success"] === true) {
          // redirect
          window.location.href = "/food-search";
      }else{
        alert("Unable to save ingredients");
        console.log(response);

        // show save button
        document.getElementById('save_ingredients').style.display = '';
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// returns the stored user token if it exists
// returns new user token if none exist
function getUserToken(){
  let token = localStorage.getItem("user_token");

  if(token === null || token == ""){
    // generate token
    token = Date.now()+"_"+Math.round(Math.random()*10000);
    
    // save token
    localStorage.setItem("user_token", token);
  }else{
    // get existing token
    token = localStorage.getItem("user_token");
  }

  return token;
}
  
export default Pantry;