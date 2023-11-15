import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import BarcodeScanner from './pages/Scanner';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Menu from './components/Menu';
import Register from './pages/Register'
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
        element: <Splash />
      }
    ]
  },
  {
    path: "/scanner",
    element: <BarcodeScanner />
  },
  {
    path: "/home",
    element: <Home />
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
