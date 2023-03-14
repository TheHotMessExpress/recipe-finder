<?php

require("config.php");
require("./functions/func_ingredients.php");

header("Content-type:application/json");


// get parameters
$token = (isset($_GET['user_token']) ? $_GET['user_token'] : "");
$ingredients = (isset($_GET['ingredients']) ? json_decode($_GET['ingredients'], true) : array());

if($token != ""){
    // get user id
    $user_id = getUserIdByToken($token);

    // clear old pantry ingredients
    clearUserIngredients($user_id);

    // add new ingredients to pantry
    foreach($ingredients as $i){
        addUserIngredient($user_id, $i);
    }

    // give response
    echo json_encode(array("success" => true));
}else{
    // invalid (empty) token
    echo json_encode(array("success" => false, "error" => array("message" => "Invalid (empty) user token")));
}

?>