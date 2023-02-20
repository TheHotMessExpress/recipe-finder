import React, { useEffect } from "react";
import { useState } from "react";
import '../index.css';
import "../config.js";

const SomeRecipe = () => {
    const inputID = localStorage.getItem("recipe_id");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState('');
    const [source, setSource] = useState("");
    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        fetch(global.config.api_url + "/recipe_information.php?query=" + inputID, {
            method: "GET",
            headers: {
              "content-type": "text/plain",
              accept: "application/json",
            },
          })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            if (response["success"] == true){
                setImage(response['image']);
                setTitle(response["title"]);
                setSource(response["source"]);
                if(response["ingredients"].length > 0){
                    for (let i = 0; i < response["ingredients"].length; i++) {
                        setIngredients(response["ingredients"][i]);
                      }
                }
                else{
                    setIngredients([]); 
                }
                
                
            }else{
                alert("No recipe found");
            }

          })
          .catch((err) => {
            console.log(err);

          });
            

        }, []);
    return (
        <div className="main">
        
      <h1>
        {title}
      </h1>
          <body>
                <p1 id = "base">

                    <img src= {image} alt="cupcake" />

                    <h3 >{title}</h3>
                    <h4>
                    <a href={source} target="_blank">Recipe Link</a>
                    </h4>
                    <h5>
                        <ul>
                        {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient["name"]} {ingredient["amountValue"]} {ingredient["amountUnit"]}</li>
              ))}
                            
                        </ul>
                    </h5>


              </p1>
        
          </body>
    </div>
  );
};
  
export default SomeRecipe;