import React from "react";
import '../css/Pantry.css';
  
const Pantry = () => {
  loadIngredients();
    return (
        
        <div>


      <h1 id="title_element">
      Select the ingredients you have at home
      </h1>
      <input type={'text'} id="ingredients_query" placeholder="Filter ingredients..."
              onInput={filterIngredients}></input>

          <div id="categories_container" > </div>
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
          data['categories'][i]['id'] + '_container"></div></div>';

      //format Dairy1_container, Meat2_container


 
      
  }

  // fill with ingredients
  for(let i = 0; i < data['ingredients'].length; i++){
    document.getElementById(data['ingredients'][i]['category_id']+"_container").innerHTML += 
      '<div class="ingredient"><input type="checkbox" id="ingredient_'+data['ingredients'][i]['id']+'" '+
      (data['ingredients'][i]['checked'] == 1 ? 'checked' : '') + '></input>'+
          '<label>' + data['ingredients'][i]['name'] + '</label></div>';

      
  }
}
console.log(document.getElementById("categories_container"));

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

// hides ingredients if they don't match the query
function filterIngredients(){
  // get query
  let query = document.getElementById('ingredients_query').value;

  // get ingredients
  let ing_eles = document.getElementsByClassName("ingredient");

  if(query == ""){
    // show all ingredients 
    for(let i = 0; i < ing_eles.length; i++){
      ing_eles[i].style.display = '';
      ing_eles[i].querySelectorAll('label')[0].innerText = ing_eles[i].querySelectorAll('label')[0].innerText;
    }
  }else{
    // filter
    let ing_eles = document.getElementsByClassName("ingredient");
  
    for(let i = 0; i < ing_eles.length; i++){
      let label = ing_eles[i].querySelectorAll('label')[0];

      if(label.innerText.toLowerCase().includes(query.toLowerCase())){
        // highlight
        label.innerHTML = boldLabel(label.innerText, query);
      }else{
        // hide
        ing_eles[i].style.display = 'none';
      }
    }
  }
}

// inspiration: https://stackoverflow.com/questions/29896907/bold-part-of-string
// bolds part of string that matches the query
function boldLabel(label_text, query){
  const n = label_text.toUpperCase();
  const q = query.toUpperCase();
  const x = n.indexOf(q);
  if (!q || x === -1) {
      return label_text; // not possible
  }
  const l = q.length;
  return label_text.substr(0, x) + '<b>' + label_text.substr(x, l) + '</b>' + label_text.substr(x + l);
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