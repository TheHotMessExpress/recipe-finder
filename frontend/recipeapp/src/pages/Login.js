import React from "react";
  
const Login = () => {
  return (
    <div>
      <h1 id="loginTitle">
      login Page
      </h1>
    <p id="login">
              Username:
              <input id="entry" class="form-control input-sm" type="text"></input>
              <br></br>
            Password:
              <input id="entry" class="form-control input-sm" type="text"></input>
              <br></br><br></br>
              <button id="buttons" type="button">Log In</button>
              <button id="buttons"  type="button">Forgot password</button>
    </p>
    </div>
  );
};
  
export default Login;