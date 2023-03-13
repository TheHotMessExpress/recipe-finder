import React from "react";
import Collapsible from "react-collapsible";
import goofy from "../images/goofy.webp";

import andrew from "../images/andrew.png";
import jesse from "../images/jesse.jpg";
  
const Home = () => {

  return (
    <div>
      <h1>
      This is the "Home" Page
      </h1>

      <p id="siteDescription">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
         in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
         Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
         deserunt mollit anim id est laborum."</p>


    <div id="collapse">
      <Collapsible trigger="*** Meet The Developers ***">
        <div id="float-container">
        <div id="developerCard"><h1 id="developerName">Andrew</h1>
        <img id="developerPicture" src={andrew}></img>
        <p id="developerDiscription">This is my final semester at EMU, majoring in Computer Science. I enjoy designing databases and backend functionality.</p>
        </div>
        <div id="developerCard"><h1 id="developerName">Camden</h1>
        <img  src={goofy}></img>
        <p id="developerDiscription">Currently in my second to last semester at EMU. Graduating in Fall 2023 with a BS in Computer Science. </p>
        </div>
        <div id="developerCard"><h1 id="developerName">Jesse</h1>
        <img id="developerPicture" src={jesse}></img>
        <p id="developerDiscription">I am starting my final year at EMU, graduating with a BA in Computer Science in the Summer or Fall semester.</p>
        </div>
        <div id="developerCard"><h1 id="developerName">Miranda</h1>
        <img  src={goofy}></img>
        <p id="developerDiscription">I have 2 more classes at emu. My Major is computer science. I plan to help on the front end with this project </p>
        </div>
        </div>
      </Collapsible>
      </div>

      

    </div>

    
  );
};


 


  
export default Home;