// import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  Outlet
} from "react-router-dom";

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import PostProduct from './pages/PostProduct';
import Recepies from './pages/Recepies';
import Categories from './pages/Categories';
import Supermarket from "./pages/Supermaket";

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
    element: <Layout/>,
    children: [ 
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "/supermarket",
        element: <Supermarket />
      },
      {
        path: "/products",
        element: <Products/>
      },
      {
        path: "/recepies",
        element: <Recepies />
      },
      {
        path: "/products/:id",
        element: <SingleProduct/>
      },
      {
        path: "/categories",
        element: <Categories />
      },
      {
        path: "/postproduct",
        element: <PostProduct/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
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


// import React , {Component} from 'react';
// import axios from 'axios';

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Hello World!!</h1>
//       </div>
//     );
//   }
// }
// export default App;
