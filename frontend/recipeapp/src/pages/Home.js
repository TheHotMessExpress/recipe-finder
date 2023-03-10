import React from "react";
import Collapsible from "react-collapsible";
  
const Home = () => {

  return (
    <div>
      <h1>
      This is the "Home" Page
      </h1>

      <p>SITE INFO</p>


    <div id="collapse">
      <Collapsible trigger="*** Meet The Developers ***">
        <div id="float-container">
        <div id="developerCard">Andrew
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras massa tellus, 
          finibus eu blandit sit amet, interdum sit amet nulla. Donec eget mollis elit, 
          nec porttitor purus. Curabitur nec diam a lectus ultricies laoreet. 
          Praesent posuere accumsan eros tempor eleifend. Donec hendrerit pellentesque mollis.
          Duis et feugiat nisl. Vestibulum at. </p>
        </div>
        <div id="developerCard">Camden
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras massa tellus, 
          finibus eu blandit sit amet, interdum sit amet nulla. Donec eget mollis elit, 
          nec porttitor purus. Curabitur nec diam a lectus ultricies laoreet. 
          Praesent posuere accumsan eros tempor eleifend. Donec hendrerit pellentesque mollis.
          Duis et feugiat nisl. Vestibulum at. </p>
        </div>
        <div id="developerCard">Jesse
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras massa tellus, 
          finibus eu blandit sit amet, interdum sit amet nulla. Donec eget mollis elit, 
          nec porttitor purus. Curabitur nec diam a lectus ultricies laoreet. 
          Praesent posuere accumsan eros tempor eleifend. Donec hendrerit pellentesque mollis.
          Duis et feugiat nisl. Vestibulum at. </p>
        </div>
        <div id="developerCard">Miranda
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras massa tellus, 
          finibus eu blandit sit amet, interdum sit amet nulla. Donec eget mollis elit, 
          nec porttitor purus. Curabitur nec diam a lectus ultricies laoreet. 
          Praesent posuere accumsan eros tempor eleifend. Donec hendrerit pellentesque mollis.
          Duis et feugiat nisl. Vestibulum at. </p>
        </div>
        </div>
      </Collapsible>
      </div>

      

    </div>

    
  );
};


 


  
export default Home;