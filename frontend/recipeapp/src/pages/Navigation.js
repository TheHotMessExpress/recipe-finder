import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  let loginText = (localStorage.getItem("login_status") == "logged_in" ? "Logout" : "Login");

  return (
    <>
          <div id="nav" class="d-flex justify-content-center">
            <Link to="/"> Home</Link> 
            <Link to="/login"> {loginText}</Link> 
            <Link to="/register"> Register</Link> 
            <Link to="/food-search"> FoodSearch</Link>
            <Link to="/pantry"> Pantry</Link> 
            <Link to="/some-recipe"> SomeRecipe</Link> 
    </div>
      

      <Outlet />
    </>
  )
};

export default Layout;
