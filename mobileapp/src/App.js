import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import { AuthContext } from "./pages/AuthContext";

import Home from './pages/Home';
import Login from './pages/Login';
import Products from "./pages/Products";
import PublishNewProduct from "./pages/PublishNewProduct";
import MyShoppingList from "./pages/MyShoppingList";
import EditPerfil from "./pages/EditPerfil";
import Allergies from "./pages/Allergies";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [               // NAVBAR
      {
        path: "/",
        element: <Home />    
      },
      {
        path: "/products",            
        element: <Products />
      },
      {
        path: "/myshoppinglist",
        element: <MyShoppingList />              
      },
      {
        path: "/allergies",
        element: <Allergies />
      }
    ]
  },                          // NO NAVBAR
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/publishnewproduct",
    element: <PublishNewProduct />
  },
  {
    path: "/editperfil",
    element: <EditPerfil />
  }
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