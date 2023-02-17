<?php

require("config.php");
require("./functions/func_ingredients.php");

header("Content-type:application/json");

// get parameters
$query_id = (isset($_GET['query']) ? $_GET['query'] : "");

if($query_id != ""){
    // fetch info from spoontacular
    $ingredients = getRecipeIngredients($query_id);
    $RecipeInformation = getRecipeInformation($query_id);

    // stub out response for front end
    echo json_encode(array("success" => true, "title" => $RecipeInformation[0]["title"], "image" => 
    $RecipeInformation[0]["image"], "source" => $RecipeInformation[0]['sourceUrL'], "ingredients" => array($ingredients)));
}else{
     // invalid (empty) string
     echo json_encode(array("success" => false, "error" => array("message" => 
     "Invalid (empty) query id")));
}
?>