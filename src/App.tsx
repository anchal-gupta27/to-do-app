import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import Lists from './Pages/Lists';

const App:React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Lists/>}/>
          <Route path="/to-do-list/:id/add-tasks" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
