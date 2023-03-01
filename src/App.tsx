import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';

const App:React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
       <Home />
        
      </header>
    </div>
  );
}

export default App;
