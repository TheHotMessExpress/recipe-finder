import React from "react";
import { Outlet, Link } from "react-router-dom";
  
const Register = () => {
  return (
    <div>
      <h1>
      This is "Register" Page
      </h1>
          <div id="regbox">
            <p id="register">
              Username:
              <input class="username" type="text"></input>
              <br></br><br></br>
              Password:
            <input class="password" type="text"></input>
            <br></br><br></br>
            Confirm Password:
            <input class="Confirmpassword" type="text"></input>
              </p>
              <br></br><br></br><br></br><br></br>
              <button type="button" id="regButton">Register</button>

          </div>
          <br></br><br></br><br></br><br></br>
          <Link id="aLink" to="/login">
              Already have an account? click here
          </Link>
    </div>
  );
};
  
export default Register;