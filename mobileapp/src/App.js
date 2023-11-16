import React from 'react';
import './App.css';
import Counter from './components/Counter';
import BarcodeScanner from './pages/Scanner';
import Splash from './pages/Splash';
import Menu from './components/Menu';
import Register from './pages/Register'
import Login from './pages/Login'
import Scanner from './pages/Scanner';
import Init from './pages/Init';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchProduct from './pages/SearchProduct';
import Test from './pages/Test';
import Porfile from './pages/Profile';
import SingleProduct from './pages/SingleProduct';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet />
      
      <Menu />
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
        element: <Test />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/splash",
        element: <Splash />
      },
      {
        path: "/profile",
        element: <Porfile />
      },
      {
        path: "/searchproduct",
        element: <SearchProduct />
      },
      {
        path: "/products/:id",
        element: <SingleProduct />
      },
      {
        path: "/scanner",
        element: <Scanner />
      },
    ]
  },
  {
    path: "/init",
    element: <Init />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

function App() {
  return (
    <div className="app">
      <div className="w-100">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
