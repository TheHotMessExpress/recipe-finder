import React from "react";
import Collapsible from "react-collapsible";
import goofy from "../images/goofy.webp";

import andrew from "../images/andrew.png";
import jesse from "../images/jesse.jpg";
import miranda from "../images/miranda.jpg";
import Camden from "../images/Camden.jpg";
import "../index.css";
  
const Home = () => {

  return (
    <div> 
  <div>
    <h1 id="title_element">Recipe Finder</h1>
  </div>
      <p id="siteDescription">Recipe Finder can help you find a new favorite recipe or figure out
              what to make for dinner with the ingredients in your own pantry!
              <br></br><br></br><br></br><br></br>
          </p>
          <p id="title2">
              Meet The Developers
          </p>


    <div id="collapse">
        <div id="float-container">
        <div id="developerCard"><h1 id="developerName">Andrew</h1>
        <img id="developerPicture" src={andrew}></img>
        <p id="developerDiscription">This is my final semester at EMU, majoring in Computer Science. I enjoy designing databases and backend functionality.</p>
        </div>
        <div id="developerCard"><h1 id="developerName">Camden</h1>
        <img id="developerPicture"  src={Camden}></img>
        <p id="developerDiscription">Currently in my second to last semester at EMU. Graduating in Fall 2023 with a BS in Computer Science. </p>
        </div>
        <div id="developerCard"><h1 id="developerName">Jesse</h1>
        <img id="developerPicture" src={jesse}></img>
        <p id="developerDiscription">I am starting my final year at EMU, graduating with a BA in Computer Science in the Summer or Fall semester.</p>
        </div>
        <div id="developerCard"><h1 id="developerName">Miranda</h1>
        <img id="developerPicture" src={miranda}></img>
        <p id="developerDiscription">I have 2 more classes at emu. My Major is computer science. I plan to help on the front end with this project </p>
        </div>
        </div>
      
      </div>

      

    </div>

    
  );
};


 


  
export default Home;