<?php

require("config.php");
require("./functions/func_ingredients.php");

header("Content-type:application/json");

// get parameters
$user_token = (isset($_GET['token']) ? $_GET['token'] : "");
$user_id = getUserIdByToken($user_token);

echo json_encode(array("success" => true, "data" => array("categories" => getAllCategories(), "ingredients" => getAllIngredients($user_id))));

?>