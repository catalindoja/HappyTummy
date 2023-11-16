import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Navbar from './components/Navbar';
import Init from './pages/Init';
import Login from './pages/Login';
import Register1 from './pages/Register1';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Scanner from './pages/Scanner';
import SearchProduct from './pages/SearchProduct';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Navbar /> 
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/profile",
        element: <Profile />
      },
    ]
  },
  {
    path: "/searchproduct",
    element: <SearchProduct />
  },
  {
    path: "/scanner",
    element: <Scanner />
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
    path: "/register1",
    element: <Register1 />
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

