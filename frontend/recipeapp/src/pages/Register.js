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
                <label>
                Name:
                <input class="Name" type="text"></input>
                </label>

                <div>
                Username:
                <input class="username" type="text"></input>
                </div>

                <div>
                Password:
                <input class="password" type="text"></input>
                  </div>

                  <div>
                      Confirm Password:
                      <input class="Conpassword" type="text"></input>
                  </div>
              </p>
             
             

          </div>
          <button type="button" id="regButton">Register</button>

          <Link id="aLink" to="/login">
              <div>Already have an account? click here</div>
          </Link>

    </div>
  );
};
  
export default Register;