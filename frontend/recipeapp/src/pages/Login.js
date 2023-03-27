import React from "react";
  
const Login = () => {
  return (
    <div>
      <h1>
      This is the "Login" Page
      </h1>

    <p id="login">
              Username:
              <input class="username" type="text"></input>
              <br></br><br></br>
            Password:
              <input class="password" type="text"></input>
              <br></br><br></br>
              <button type="button">Log In</button>
              &nbsp;&nbsp;&nbsp;&nbsp;

              <button type="button">Forgot password (Doesn't work for now)</button>
              
    </p>

    </div>
  );
};
  
export default Login;