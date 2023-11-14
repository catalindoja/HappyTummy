import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import BarcodeScanner from './pages/Scanner';
import Home from './pages/Home';
import Menu from './components/Menu';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

const Layout = () => {
  return (
    <>

      <Outlet />
      <Counter />
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
        element: <Home />
      }
    ]
  },
  {
    path: "/scanner",
    element: <BarcodeScanner />
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
