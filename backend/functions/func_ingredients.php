<?php

// calls spoontacular API to get recipe results
function getRecipeIngredients($id){
    // get api key
    global $spoontacular_api_key;

    // perform GET request to API
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.spoonacular.com/recipes/'.$id.'/ingredientWidget.json?apiKey='.$spoontacular_api_key);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);

    // format data
    $response = json_decode($result, true);
    $IngredientList = array();

    foreach($response['ingredients'] as $ingredient){
        $IngredientList[] = array("name" => $ingredient['name'], "image" => $ingredient['image']);
    }

    // return list of Ingredients
    return $IngredientList;
}