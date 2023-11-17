import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Routes>
            {/* NAVBAR */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/myshoppinglist" element={<MyShoppingList />} />
            <Route path="/allergies" element={<Allergies />} />

            {/* NO NAVBAR */}
            <Route path="/login" element={<Login />} />
            <Route path="/publishnewproduct" element={<PublishNewProduct />} />
            <Route path="/editperfil/:id" element={<EditPerfil />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
