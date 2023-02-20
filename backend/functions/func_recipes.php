<?php

// calls spoontacular API to get recipe results
function getRecipes($query){
    // get api key
    global $spoontacular_api_key;

    // perform GET request to API
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.spoonacular.com/recipes/complexSearch?apiKey='.$spoontacular_api_key.'&query='.$query);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);

    // format data
    $response = json_decode($result, true);
    $list = array();

    foreach($response['results'] as $recipe){
        $list[] = array("id" => $recipe['id'], "title" => $recipe['title'], "image" => $recipe['image']);
    }

    // return list of recipes
    return $list;
}