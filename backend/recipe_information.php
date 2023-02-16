<?php

require("config.php");

header("Content-type:application/json");

// get parameters
$query_id = (isset($_GET['query']) ? $_GET['query'] : "");

if($query_id != ""){
    // stub out response for front end
    echo json_encode(array("success" => true, "title" => "TestTitle", "image" => 
    "https://spoonacular.com/recipeImages/716429-556x370.jpg", "ingredients" => array("Ingredient1", "Ingredient2"), "source" => "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html"));
}else{
     // invalid (empty) string
     echo json_encode(array("success" => false, "error" => array("message" => 
     "Invalid (empty) query id")));
}
?>