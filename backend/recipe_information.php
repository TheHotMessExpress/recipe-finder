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

    // response for front end
    if(Count($ingredients) == 0 || Count($RecipeInformation) == 0){
        echo json_encode(array("success" => false, "error" => array("message" => "Missing recipe information")));
    }else{
        echo json_encode(array("success" => true, "title" => $RecipeInformation["title"], "image" => 
        $RecipeInformation["image"], "source" => $RecipeInformation['sourceUrL'], "ingredients" => array($ingredients)));
    }
}else{
     // invalid (empty) string
     echo json_encode(array("success" => false, "error" => array("message" => 
     "Invalid (empty) query id")));
}
?>