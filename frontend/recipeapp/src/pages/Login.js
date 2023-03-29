import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
  
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // disable button to prevent duplicate submissions
    document.getElementById("loginButton").style.display = "none";
    
    // register with backend
    console.log(global.config.api_url + "/login.php?email=" + email + "&password=" + password);
    fetch(global.config.api_url + "/login.php?email=" + email + "&password=" + password, {
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

        // redirect
        alert("You are now logged in. Your pantry is ready.");
        window.location.href = "/pantry";
      } else {
        // display error
        alert("Invalid email or password.");
      }

      // show button again
      document.getElementById("loginButton").style.display = "";
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <h1>
      This is the "Login" Page
      </h1>
        <form onSubmit={handleSubmit}>
          <p id="login">
                Username:
                <input className="username" 
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
                <br></br><br></br>
                Password:
                <input className="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                ></input>
                <br></br><br></br>
                <button  id="loginButton"
                  type="submit"
                >Log In</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  type="button" 
                  disabled
                >Forgot password</button>
          </p>
        </form>
        <Link id="aLink" to="/register">
          <div>Need to create an account? click here</div>
        </Link>
    </div>
  );
};
  
export default Login;