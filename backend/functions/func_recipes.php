<?php
/** 
 * @param string $query The search query to use for recipe search.
 * @param int $userId The user ID of the user making the request.
 * @param array $IngredientList An array of ingredients to use for ingredient search (optional).
 * @param int $useIngredients Flag indicating whether to use the ingredient search.
 * @param string $selectedDiet The selected diet for the recipe search (optional).
 * @param int $maxCalories Value of max Calories.
 * @param int $maxCarbs Value of max Carbs.
 * @param int $maxSodium Value of max Sodium.
 * @param int $maxSugar Value of max Sugar.
 * @return array $list An array of recipes, each containing an id, title, and image.
*/
// calls spoontacular API to get recipe results
function getRecipes($query, $userId, $IngredientList, $useIngredients, $selectedDiet, $params, $nutrition){
    $result;
    // get api key
    global $spoontacular_api_key;
    // build the query parameters string
    $query_params = array();
    $query_params['query'] = urlencode($query);
    if (!empty($selectedDiet)) {
        if ($selectedDiet == "dairy-free") {
            $query_params['intolerances'] = 'dairy';
        } else {
            $query_params['diet'] = urlencode($selectedDiet);
        }
    }
    // merge the query parameters array with the $params array passed to the function
    $params = array_merge($query_params, $params);

    $url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='.$spoontacular_api_key.'&' . http_build_query($params);

    
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
            $url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='.$spoontacular_api_key.'&' . http_build_query($params);
            
        
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
    if($nutrition == false){
        foreach($response['results'] as $recipe){
            $list[] = array("id" => $recipe['id'], "title" => $recipe['title'], "image" => $recipe['image']);
        }
    }
    if($nutrition == true){
        if (isset($params['maxCalories']) || isset($params['maxCarbs']) || isset($params['maxSugar']) || isset($params['maxSodium'])) {
            foreach($response['results'] as $recipe){
                $list[] = array("id" => $recipe['id'], "title" => $recipe['title'], "image" => $recipe['image'], "nutrition" => $recipe['nutrition']['nutrients']);
            }
        }
    } 
    // return list of recipes
    return $list;
}
