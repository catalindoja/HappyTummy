import React from 'react';
import './App.css';
import BarcodeScanner from './pages/Scanner';
import Menu from './components/Menu';
import Register from './pages/Register'
import Login from './pages/Login'
import Scanner from './pages/Scanner';
import Init from './pages/Init';
import Home from './pages/Home';
import Search from './pages/Search';
import SingleRecipe from './pages/SingleRecipe';
import Porfile from './pages/Profile';
import SingleProduct from './pages/SingleProduct';
import PostProduct from './pages/PostProduct';
import PostRecipe from './pages/PostRecipe';
import EditPerfil from './pages/EditPerfil';
import { i18n } from 'i18next';
import Allergies from './pages/Allergies';
import Configuration from './components/Configration';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-container">
      <Outlet />
      <Menu />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Init />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "profile",
        element: <Porfile />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "products/:id",
        element: <SingleProduct />
      },
      {
        path: "recipes/:id",
        element: <SingleRecipe />
      },
      {
        path: "scanner",
        element: <Scanner />
      },
      {
        path: "postproduct",
        element: <PostProduct />
      },
      {
        path: "postrecipe",
        element: <PostRecipe />
      },
      {
        path: "editprofile/:id",
        element: <EditPerfil />
      },
      {
        path: "scanner",
        element: <Scanner />
      },
      {
        path: "allergies",
        element: <Allergies />
      }
    ]
  }
]);

const App = () => {
  return (
    <div className="app">
      <div className="w-100">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
