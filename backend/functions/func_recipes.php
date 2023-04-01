<?php
/** 
 * @param string $query The search query to use for recipe search.
 * @param int $userId The user ID of the user making the request.
 * @param array $IngredientList An array of ingredients to use for ingredient search (optional).
 * @param string $selectedDiet The selected diet for the recipe search (optional).
 * @param int $useIngredients Flag indicating whether to use the ingredient search.
 * @param int $maxCalories Value of max Calories.
 * @param int $maxCarbs Value of max Carbs.
 * @param int $maxSodium Value of max Sodium.
 * @param int $maxSugar Value of max Sugar.
 * @return array $list An array of recipes, each containing an id, title, and image.
*/
// calls spoontacular API to get recipe results
function getRecipes($query, $userId, $IngredientList, $maxCalories, $maxCarbs, $maxSodium, $maxSugar, $selectedDiet, $useIngredients = 0){
    $result;
    // get api key
    global $spoontacular_api_key;
    // build the query parameters string
    $params = array();
    $params[] = 'query=' . urlencode($query);
    if (!empty($selectedDiet)) {
        if($selectedDiet == "dairy-free")
            $params[] = 'intolerances=dairy';
        else
            $params[] = 'diet=' . urlencode($selectedDiet);

    }
    if (!empty($maxCalories)) {
        $params[] = 'maxCalories=' . urlencode($maxCalories);
    }
    if (!empty($maxCarbs))  {
        if($maxCarbs != 0)
            $params[] = 'maxCarbs=' . urlencode($maxCarbs);
    }
    if (!empty($maxSodium)) {
        $params[] = 'maxSodium=' . urlencode($maxSodium);
    }
    if (!empty($maxSugar))  {
        $params[] = 'maxSugar=' . urlencode($maxSugar);
    }
    $url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='.$spoontacular_api_key.'&' . implode('&', $params);

    
    if ($useIngredients == 0 || empty($IngredientList)){
        // perform GET request to API
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);
    }
    else {
            //iterate through ingredient list to get ingredient names
            foreach($IngredientList as $ingredient){
                $ingredientNames[] = $ingredient['name'];
            }
            $StringIngredientList = implode(', ',$ingredientNames);
            $params[] = 'includeIngredients=' . urlencode($StringIngredientList);
            $url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='.$spoontacular_api_key.'&' . implode('&', $params);
            
        
            // perform GET request to API
            $ch = curl_init();

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
