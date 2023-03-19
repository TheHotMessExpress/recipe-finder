<?php

require("config.php");
require("./functions/func_recipes.php");
require("./functions/func_ingredients.php");

header("Content-type:application/json");

// get parameters
$query_string = (isset($_GET['query']) ? $_GET['query'] : "");
$token = (isset($_GET['token']) ? $_GET['token'] : "");
$use_ingredients = (isset($_GET['use_ingredients'])? $_GET['use_ingredients'] : "");


if($query_string != ""){
    if($token != ""){
    // get user id
    $user_id = getUserIdByToken($token);
    // get user ingredients
    $IngredientList = getUserIngredients($user_id);
    if($use_ingredients == 1 && empty($IngredientList)){
        echo json_encode(array("success" => false, "error" => array("message" => "Empty User Pantry")));
    }
    else{
    // fetch info from spoontacular
    $recipes = getRecipes($query_string, $user_id, $IngredientList, $use_ingredients);

    // stub out response for front end
    echo json_encode(array("success" => true, "data" => array($recipes)));
    }
}else{
    // invalid (empty) token
    echo json_encode(array("success" => false, "error" => array("message" => "Invalid (empty) user token")));
}}else{
    // invalid (empty) string
    echo json_encode(array("success" => false, "error" => array("message" => "Invalid (empty) query string")));
}

?>