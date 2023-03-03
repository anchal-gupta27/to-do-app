import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import Lists from './Pages/Lists';
import UpdateLists from './Pages/UpdateLists';

const App:React.FC = () => {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/to-do-list-details/:id/update' element={<UpdateLists/>} />
          <Route path='/' element={<Lists/>}/>
          <Route path="/to-do-list/:id/add-tasks" element={<Home/>} />

        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
