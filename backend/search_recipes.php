<?php

require("config.php");
require("./functions/func_recipes.php");
require("./functions/func_ingredients.php");

header("Content-type:application/json");
try {
  // get parameters
  $queryString = $_GET['query'] ?? "";
  $token = $_GET['token'] ?? "";
  $use_ingredients = $_GET['use_ingredients'];
  $selected_diets = $_GET['selectedDiet'] ?? "";
  $selected_diets_array = explode(',', $selected_diets);
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
  // Skip token validation if pantry filtering is not requested
  if ($use_ingredients == 1) {
    if ($token === "") {
      throw new Exception("Empty User Pantry", 400);
    }
    $userId = getUserIdByToken($token);
    $IngredientList = getUserIngredients($userId);
    if (empty($IngredientList)){
      throw new Exception("Empty User Pantry", 400);
    }
  } else {
    $IngredientList = array();
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
    // fetch info from spoontacular
    $recipes = getRecipes($queryString, $IngredientList, $use_ingredients, $params, $nutrition, $selected_diets_array);
    if (isset($recipes[0]['code']) && $recipes[0]['code'] == 402){
      throw new Exception("Out of API Requests", 400);
    }
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
    if ($maxCarbs != null && $maxCalories == null && $maxSodium == null && $maxSugar == null){
      foreach($recipes as $recipe){
        $nutrition = $recipe['nutrition'];
        if($nutrition[0]['amount'] > $maxCarbs)
          throw new Exception("No recipes with selected filters", 400);
      }
    }
    if ($maxSodium != null && $maxCalories == null && $maxCarbs == null && $maxSugar == null){
      foreach($recipes as $recipe){
        $nutrition = $recipe['nutrition'];
        if($nutrition[0]['amount'] > $maxSodium)
          throw new Exception("No recipes with selected filters", 400);
      }
    }
    if ($use_ingredients != 0) {
      if (!$recipes){
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