<?php

// checks if email is taken
// returns true or false
function isEmailAvailable($email){
    global $conn;

    // check if email exists
    $sql = "SELECT `email` FROM `users` WHERE `email` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    return !isset($result['email']) || $result['email'] === "";
}

// generates a token for a user and stores it in the db
function generateUserToken($user_id){
    global $conn;

	// generate a random string
	$token = openssl_random_pseudo_bytes(16);

	// convert the binary data into hexadecimal representation
	$token = bin2hex($token);

    // associate token
    $sql = "INSERT INTO `user_tokens` SET `user_id` = ?, `token` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $user_id, $token);
    $stmt->execute();
    $stmt->close();

	return $token;
}

// create user account in database
// returns user ID
function registerUser($name, $email, $password){
    global $conn;

    // hash password
    $password = password_hash($password, PASSWORD_DEFAULT);

    // insert user
    $sql = "INSERT INTO `users` SET `name` = ?, `email` = ?, `password` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $password);
    $stmt->execute();
    $stmt->close();

    // get user id
    $user_id = $conn->insert_id;
    return $user_id;
}

// checks if a user exists for that email and passwords match
// returns token if the info is valid
function loginUser($email, $password){
    global $conn;

    // fetch user
    $sql = "SELECT `email`, `password`, `token`
            FROM `users` AS `u`
            JOIN `user_tokens` AS `ut` ON `ut`.`user_id` = `u`.`id`
            WHERE `email` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();


    // compare passwords
    if(isset($result['password']) && password_verify($password, $result['password'])){
        return $result['token'];
    }else{
        return "";
    }
}

?>