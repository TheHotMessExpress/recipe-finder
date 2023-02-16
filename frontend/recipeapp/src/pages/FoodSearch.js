import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import List from "../components/List";
import '../index.css';

const FoodSearch = () => {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

    const checkTextInput = () => {
    alert('Success');
  };


  //Submit names from demo
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
 
  const handleSubmit = (event) => {
   console.log("handleSubmit called");
   event.preventDefault();
   setNames([name]);
   fetch("http://localhost:8080/add_name.php?name="+name, {
       "method": "GET",
       "headers": {
         "content-type": "text/plain",
         "accept": "application/json"
       }
     })
     .then(response => response.json())
     .then(response => {
       console.log(response)
     })
     .catch(err => {
       console.log(err);
     });
    setName("");
  };

    // load list of all names from demo
    fetch("http://localhost:8080/get_names.php", {
      "method": "GET",
      "headers": {
        "content-type": "text/plain",
        "accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
      setNames([...response['data']]);
    })
    .catch(err => {
      console.log(err);
    });
 

  return (
    <div className="main">
      <h1>This is "FoodSearch" Page</h1>

      <div>
        <TextField className="search"
        id="outlined-basic"
        onChange={inputHandler}
        variant="outlined"
        fullWidth
        label="Search"
        onSubmit={handleSubmit}/>
  
        <button disabled={!inputText} class="FoodSearchButton" onClick={checkTextInput}>Click me</button>
      </div>

    <div className="foodSearch">
    Recipes:

    {/* display names from demo */}
    <ul>
        {names.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
    </ul>
    
    </div>

    </div>
  );
}

export default FoodSearch;



// const FoodSearch = () => {
//   const [inputText, setInputText] = useState("");
//   let inputHandler = (e) => {
//     var lowerCase = e.target.value.toLowerCase();
//     setInputText(lowerCase);
//   };

//   //Checks for input in search box
//   const checkTextInput = () => {
//     alert('Success');
//   };

//   return (
//     <div className="main">
//       <h1>This is "FoodSearch" Page</h1>
//       <div>
//         <TextField className="search"
//           id="outlined-basic"
//           onChange={inputHandler}
//           variant="outlined"
//           fullWidth
//           label="Search"
//         />
//         <button disabled={!inputText} class="FoodSearchButton" onClick={checkTextInput}>Click me</button>
//       </div>
//       <div className = "list">
//       <List input={inputText} onChange={event => setInputText(event.target.value)} /> 
//       </div>
//     </div>
//   );
// };

// export default FoodSearch;