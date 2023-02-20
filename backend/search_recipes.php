<?php

require("config.php");
require("./functions/func_recipes.php");

header("Content-type:application/json");

// get parameters
$query_string = (isset($_GET['query']) ? $_GET['query'] : "");

if($query_string != ""){
    // fetch info from spoontacular
    $recipes = getRecipes($query_string);

    // stub out response for front end
    echo json_encode(array("success" => true, "data" => array($recipes)));
}else{
    // invalid (empty) string
    echo json_encode(array("success" => false, "error" => array("message" => "Invalid (empty) query string")));
}

?>