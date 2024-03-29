import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
  
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // disable button to prevent duplicate submissions
    document.getElementById("regButton").style.display = "none";
    
    // verify passwords are matching
    if(password != password2){
      alert("Your passwords do not match.");
      setPassword("");
      setPassword2("");
      document.getElementById("regButton").style.display = "";
    }else{
      // register with backend
      fetch(global.config.api_url + "/register.php?name=" + name + "&email=" + email + "&password=" + password, {
        method: "GET",
        headers: {
          "content-type": "text/plain",
          accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response['success'] === true) {
            // save token
            localStorage.setItem("user_token", response['data']['token']);
            localStorage.setItem("login_status", "logged_in");

            // redirect
            alert("Thanks for registering! You pantry is ready to fill.");
            window.location.href = "/pantry";
          } else {
            // see why it failed
            if(response['error']['message'] == "Email already taken"){
              alert("That email is already registered. Please register with a different email, or login.");
            }else{
              alert("Cannot register at this time. Please try again later.");
            }
          }

          // show button again
          document.getElementById("regButton").style.display = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1 id="title_element">
      Site Registration
      </h1>
        <form  onSubmit={handleSubmit}>
          <div id="regbox">
            <div id="register">
              <div>
                Name:
                <input id="entry" class="form-control input-sm" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></input>
              </div>

              <div>
                Email:
                <input id="entry" class="form-control input-sm" 
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>

              <div>
                Password:
                <input id="entry" class="form-control input-sm"  
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                ></input>
              </div>

              <div>
                  Confirm Password:
                  <input id="entry" class="form-control input-sm"  
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                    minLength={8}
                  ></input>
              </div>
              <br/>
            </div>
          </div>
          <button type="submit" id="regButton">Register</button>
        </form>

        <Link id="aLink" to="/login">
            <div>Already have an account? click here</div>
          </Link>

    </div>
  );
};
  
export default Register;