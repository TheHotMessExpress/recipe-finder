<?php

// calls spoontacular API to get recipe ingredients
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
    if(isset($response['ingredients'])){
        foreach($response['ingredients'] as $ingredient){
            $IngredientList[] = array("name" => $ingredient['name'], "amountValue" => $ingredient['amount']['us']['value'], "amountUnit" => $ingredient['amount']['us']['unit'] );
        }
    }

    // return list of Ingredients
    return $IngredientList;
}

// calls spoontacular API to get recipe information
function getRecipeInformation($id){
    // get api key
    global $spoontacular_api_key;

    // perform GET request to API
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.spoonacular.com/recipes/'.$id.'/information?apiKey='.$spoontacular_api_key.'&includeNutrition=false');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);

    // format data
    $response = json_decode($result, true);
    $RecipeInformation = array();

    if(isset($response['title']) && isset($response['sourceUrl'])  && isset($response['image'])){
        $RecipeInformation = array("title" => $response['title'], "sourceUrL" => $response['sourceUrl'], "image" => $response['image']);
    }

    // return list of Information
    return $RecipeInformation;
}