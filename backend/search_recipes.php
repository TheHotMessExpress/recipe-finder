<?php

require("config.php");

header("Content-type:application/json");

// stub out response for front end
echo json_encode(array("success" => true, "data" => array(array("title" => "Recipe #1"), array("title" => "Recipe #2"))));

?>