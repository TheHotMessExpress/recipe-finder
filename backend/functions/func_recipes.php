<?php

// calls spoontacular API to get recipe results
function getRecipes($query, $user_id, $IngredientList, $selected_diet, $use_ingredients = 0){
    // get api key
    global $spoontacular_api_key;
    if ($use_ingredients == 0 || empty($IngredientList)){
    // perform GET request to API
    $ch = curl_init();
    if($selected_diet == "dairy-free"){
    curl_setopt($ch, CURLOPT_URL, 'https://api.spoonacular.com/recipes/complexSearch?apiKey='.$spoontacular_api_key.'&query='.$query."&intolerances=dairy");
    }
    else{
        curl_setopt($ch, CURLOPT_URL, 'https://api.spoonacular.com/recipes/complexSearch?apiKey='.$spoontacular_api_key.'&query='.$query."&diet=".$selected_diet);

    }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);
    }
    else{
            //iterate through ingredient list to get ingredient names
            foreach($IngredientList as $ingredient){
                $ingredientNames[] = $ingredient['name'];
            }
            $StringIngredientList = implode(', ',$ingredientNames);
            
        
        // perform GET request to API
        $ch = curl_init();
        if($selected_diet == "dairy-free"){
            curl_setopt($ch, CURLOPT_URL, 'https://api.spoonacular.com/recipes/complexSearch?apiKey='.$spoontacular_api_key.'&query='.$query.'&intolerances=dairy&includeIngredients='.$StringIngredientList);
        }
        else{
            curl_setopt($ch, CURLOPT_URL, 'https://api.spoonacular.com/recipes/complexSearch?apiKey='.$spoontacular_api_key.'&query='.$query.'&diet='.$selected_diet.'&includeIngredients='.$StringIngredientList);

        }
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);   
}
    // format data
    $response = json_decode($result, true);
    $list = array();

    foreach($response['results'] as $recipe){
        $list[] = array("id" => $recipe['id'], "title" => $recipe['title'], "image" => $recipe['image']);
    }

    // return list of recipes
    return $list;
}
