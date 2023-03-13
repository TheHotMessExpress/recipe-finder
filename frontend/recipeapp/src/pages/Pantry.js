import React from "react";
  
const Pantry = () => {
  console.log(getUserToken());
  return (
    <div>
      <h1>
      This is the "Pantry" Page
      </h1>
    </div>
  );
};

// returns the stored user token if it exists
// returns new user token if none exist
function getUserToken(){
  let token = localStorage.getItem("user_token");

  if(true){
    // generate token
    token = Date.now()+"_"+Math.round(Math.random()*10000);
    
    // save token
    localStorage.setItem("user_token", token);
  }else{
    // get existing token
    token = localStorage.getItem("user_token");
  }

  return token;
}
  
export default Pantry;