<?php

require("config.php");
require("./functions/func_ingredients.php");

header("Content-type:application/json");

echo json_encode(array("success" => true, "data" => array("categories" => getAllCategories(), "ingredients" => getAllIngredients())));

?>