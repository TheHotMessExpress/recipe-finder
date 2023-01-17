import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import logo from './logo.svg';
import './App.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route, Link, Outlet} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/SecondPage" element={<SecondPage/>} >
      </Route>
    </Routes>
  </Router>
);

function Home(){
 const [names, setNames] = useState([]);
 const [name, setName] = useState("");

 const handleSubmit = (event) => {
  console.log("handleSubmit called");
  event.preventDefault();
  setNames([name]);
  fetch("http://localhost:8080/add_name.php?name="+name, {
      "method": "GET",
      "headers": {
        "content-type": "text/plain",
        "accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
   setName("");
 };

 return (
   <div className="App">
     <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
       <p>
         Hot Mess Express: Tech Demo
       </p>

{/* Name Form */}
<div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {names.map((name, index) => (
          <p key={index}>Hello, {name}!</p>
        ))}
      </ul>
    </div>
    <Link to="/SecondPage">
        Second Page
      </Link>
      <Outlet />
     </header>
   </div>
 );
}

function SecondPage() {
  const [names, setNames] = useState([]);

  // load list of all names
  fetch("http://localhost:8080/get_names.php", {
    "method": "GET",
    "headers": {
      "content-type": "text/plain",
      "accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(response => {
    setNames([...response['data']]);
  })
  .catch(err => {
    console.log(err);
  });

  return (
    <div>
      <h1>Here is the second page of our application!</h1>
      <ul>
        {names.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
      </ul>
      <Link to="/">
        Go back to home page
      </Link>
    </div>
  );
}

// function NameForm() {
//   const [names, setNames] = useState([]);
//   const [name, setName] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setNames([...names, name]);
//     setName("");
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//           />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//       <ul>
//         {names.map((name, index) => (
//           <li key={index}>{name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


reportWebVitals();