<?php

require("config.php");
require("./functions/func_recipes.php");
require("./functions/func_ingredients.php");

header("Content-type:application/json");
try {
  // get parameters
  $query_string = $_GET['query'] ?? "";
  $token = $_GET['token'] ?? "";
  $use_ingredients = $_GET['use_ingredients'] ?? "";
  $selected_diet = $_GET['selectedDiet'] ?? "";

  // Validate parameters
  if ($query_string === "") {
    throw new Exception("Invalid (empty) query string", 400);
  }
  if ($token === "") {
    throw new Exception("Invalid (empty) user token", 400);
  }

  // get user id
  $user_id = getUserIdByToken($token);
  // get user ingredients
  $IngredientList = getUserIngredients($user_id);
  if ($use_ingredients == 1 && empty($IngredientList)){
    throw new Exception("Empty user pantry", 400);
  }
    
  // fetch info from spoontacular
  $recipes = getRecipes($query_string, $user_id, $IngredientList, $selected_diet, $use_ingredients);

  // stub out response for front end
  echo json_encode(array("success" => true, "data" => array($recipes)));
}
catch (Exception $e) {
    // Handle errors
    http_response_code($e->getCode());
    echo json_encode(array("success" => false, "error" => array("message" => $e->getMessage())));
  }

?>