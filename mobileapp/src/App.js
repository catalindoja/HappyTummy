import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Home />
      <Counter /> 
    </div>
  );
}

export default App;
