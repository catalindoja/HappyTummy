import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Register from './pages/Register';
//import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import PostProduct from './pages/PostProduct';
import Recipes from './pages/Recipes';
import Allergies from './pages/Allergies';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';
import SingleRecipe from './pages/SingleRecipe';
import PostRecipe from './pages/PostRecipe';
import Markets from './pages/Markets';
import SingleMarket from './pages/SingleMarket';
import PostMarket from './pages/PostMarket';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/products/:id",
        element: <SingleProduct />
      },
      {
        path: "/postproduct",
        element: <PostProduct />
      },
      {
        path: "/recipes",
        element: <Recipes />
      },
      {
        path: "/recipes/:id",
        element: <SingleRecipe />
      },
      {
        path: "/postrecipe",
        element: <PostRecipe />
      },
      {
        path: "/markets",
        element: <Markets />
      },
      {
        path: "/markets/:id",
        element: <SingleMarket />
      },
      {
        path: "/postmarket",
        element: <PostMarket />
      },
      {
        path: "/allergies",
        element: <Allergies />
      },
      {
        path: "/statistics",
        element: <Statistics />
      },
      {
        path: "/profile",
        element: <Profile />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;