import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';

import Home from './pages/Home';
import Login from './pages/Login';
import Products from "./pages/Products";
import PublishNewProduct from "./pages/PublishNewProduct";

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