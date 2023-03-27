<?php

require("config.php");
require("./functions/func_users.php");

header("Content-type:application/json");

// get parameters
$name = (isset($_GET['name']) ? $_GET['name'] : "");
$email = (isset($_GET['email']) ? $_GET['email'] : "");
$password = (isset($_GET['password']) ? $_GET['password'] : "");

if($name != "" && $email != "" && $password != ""){
    // check if email is valid
    if(isEmailAvailable($email)){
        // register
        $user_id = registerUser($name, $email, $password);
        echo json_encode(array("success" => true, "data" => array("token" => generateUserToken($user_id))));
    }else{
        // email is already taken
        echo json_encode(array("success" => false, "error" => array("message" => 
     "Email already taken")));
    }
}else{
     // invalid (empty) string
     echo json_encode(array("success" => false, "error" => array("message" => 
     "Missing required fields")));
}
?>