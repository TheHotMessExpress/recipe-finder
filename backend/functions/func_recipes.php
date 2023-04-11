<?php
/** 
 * @param string $query The search query to use for recipe search.
 * @param int $user_id The user ID of the user making the request.
 * @param array $IngredientList An array of ingredients to use for ingredient search (optional).
 * @param string $selected_diet The selected diet for the recipe search (optional).
 * @param int $use_ingredients Flag indicating whether to use the ingredient search.
 * @return array $list An array of recipes, each containing an id, title, and image.
*/
// calls spoontacular API to get recipe results
function getRecipes($query, $user_id, $IngredientList, $selected_diets = array(), $use_ingredients = 0){
    // get api key
    global $spoontacular_api_key;
    $query_params = array();
    $query_params['query'] = urlencode($query);
    $diets = array();
    $intolerances = array();
    if ($use_ingredients == 0 || empty($IngredientList)){
        // perform GET request to API
        $ch = curl_init();
        foreach ($selected_diets as $selectedDiet) {
            if ($selectedDiet == 'dairy-free') {
                $intolerances[] = 'dairy';
            } else   {
                $diets[] = $selectedDiet;
            }
        }   
        if (!empty($diets)) {
            $query_params['diet'] = implode(',', $diets);
        }
        if (!empty($intolerances)) {
            $query_params['intolerances'] = implode(',', $intolerances);
        }
        $url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' . $spoontacular_api_key . '&' . http_build_query($query_params);
        echo $url;
    curl_setopt($ch, CURLOPT_URL, $url);
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
        foreach ($selected_diets as $selectedDiet) {
            if ($selectedDiet == 'dairy-free') {
                $intolerances[] = 'dairy';
            } else   {
                $diets[] = $selectedDiet;
            }
        }   
        if (!empty($diets)) {
            $query_params['diet'] = implode(',', $diets);
        }
        if (!empty($intolerances)) {
            $query_params['intolerances'] = implode(',', $intolerances);
        }
        $url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' . $spoontacular_api_key . '&' . http_build_query($query_params) . '&includeIngredients='.$StringIngredientList ;
        curl_setopt($ch, CURLOPT_URL, $url);
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
