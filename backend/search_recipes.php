<?php

require("config.php");
require("./functions/func_recipes.php");
require("./functions/func_ingredients.php");

header("Content-type:application/json");
try {
  // get parameters
  $queryString = $_GET['query'] ?? "";
  $token = $_GET['token'] ?? "";
  $useIngredients = $_GET['use_ingredients'] ?? "";
  $selectedDiet = $_GET['selectedDiet'] ?? null;
  $maxCalories = $_GET['maxCalories'] ?? null;
  $maxCarbs = $_GET['maxCarbs'] ?? null;
  $maxSodium = $_GET['maxSodium'] ?? null;
  $maxSugar = $_GET['maxSugar'] ?? null; 
  $params = array();
  $nutrition = false;
  // Validate parameters
  if ($queryString === "") {
    throw new Exception("Invalid (empty) query string", 400);
  }
  if ($token === "") {
    throw new Exception("Invalid (empty) user token", 400);
  }
  if ($maxCalories != null){
    $params['maxCalories'] = $maxCalories;
    $nutrition = true;
  }
  if ($maxCarbs != null){
    $params['maxCarbs'] = $maxCarbs;
    $nutrition = true;
  }
  if ($maxSodium != null){
    $params['maxSodium'] = $maxSodium;
    $nutrition = true;
  }
  if ($maxSugar != null){
    $params['maxSugar'] = $maxSugar;
    $nutrition = true;
  }

  // get user id
  $userId = getUserIdByToken($token);
  // get user ingredients
  $IngredientList = getUserIngredients($userId);
  if ($useIngredients == 1 && empty($IngredientList)){
    throw new Exception("Empty user pantry", 400);
  }
    // fetch info from spoontacular
    $recipes = getRecipes($queryString, $userId, $IngredientList, $useIngredients, $selectedDiet, $params, $nutrition);
    if ($maxCalories != null && $maxSodium != null){
      foreach($recipes as $recipe){
        $nutrition = $recipe['nutrition'];
        if($nutrition[0]['amount'] > $maxCalories || $nutrition[1]['amount'] > $maxSodium)
          throw new Exception("No recipes with selected filters", 400);
      }
    }
    if ($maxCalories != null && $maxCarbs!= null){
      foreach($recipes as $recipe){
        $nutrition = $recipe['nutrition'];
        if($nutrition[0]['amount'] > $maxCalories || $nutrition[1]['amount'] > $maxCarbs)
          throw new Exception("No recipes with selected filters", 400);
      }
    }
    if ($maxCalories != null && $maxSodium == null){
      foreach($recipes as $recipe){
        $nutrition = $recipe['nutrition'];
        if($nutrition[0]['amount'] > $maxCalories)
          throw new Exception("No recipes with selected filters", 400);
      }
    } 
  // stub out response for front end
  echo json_encode(array("success" => true, "data" => array($recipes)));
}
catch (Exception $e) {
    // Handle errors
    http_response_code($e->getCode());
    echo json_encode(array("success" => false, "error" => array("message" => $e->getMessage())));
  }

?>