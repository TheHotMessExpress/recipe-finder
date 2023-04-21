import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import FoodSearch from "./pages/FoodSearch";
import Login from "./pages/Login";
import Pantry from "./pages/Pantry";
import Register from "./pages/Register";
import SomeRecipe from "./pages/SomeRecipe";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigation />}>
          <Route index element={<FoodSearch />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="pantry" element={<Pantry />} />
          <Route path="home" element={<Home />} />
          <Route path="some-recipe" element={<SomeRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);