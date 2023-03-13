import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <div id="nav">
            <Link to="/"> Home</Link> 
            <Link to="/login"> Login</Link> 
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
