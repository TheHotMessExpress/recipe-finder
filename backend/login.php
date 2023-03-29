<?php

require("config.php");
require("./functions/func_users.php");

header("Content-type:application/json");

// get parameters
$email = (isset($_GET['email']) ? $_GET['email'] : "");
$password = (isset($_GET['password']) ? $_GET['password'] : "");

if($email != "" && $password != ""){
    // check login credentials
    $token = loginUser($email, $password);

    if(isset($token) && $token != ""){
        // successful login
        echo json_encode(array("success" => true, "data" => array("token" => $token)));
    }else{
        // login failed
        echo json_encode(array("success" => false, "error" => array("message" => 
     "Invalid email or password")));
    }
}else{
     // invalid (empty) string
     echo json_encode(array("success" => false, "error" => array("message" => 
     "Missing required fields")));
}
?>