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
              <input id="entry" class="form-control input-sm" type="text"></input>
              Password:
             <input id="entry" class="form-control input-sm" type="text"></input>

            Confirm Password:
                  <input id="entry" class="form-control input-sm" type="text"></input>

              </p>
         
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