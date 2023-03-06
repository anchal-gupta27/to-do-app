import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import Lists from './Pages/Lists';
import UpdateLists from './Pages/UpdateLists';

const App:React.FC = () => {

  const [theme, setTheme] = useState<string>("light");
  const toggleTheme = () => {
    if(theme==='light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  useEffect(() => {
    document.body.className = theme;
    }, [theme]);


  return (
    <div className={`${theme}`}> 
      <Header/>
      <button className='toggle-button' onClick={toggleTheme}>
        Toggle Theme
      </button>
      <BrowserRouter>
        <Routes>
          <Route path='/to-do-list-details/:id/update' element={<UpdateLists/>} />
          <Route path='/' element={<Lists/>}/>
          <Route path="/to-do-list/:id/add-tasks" element={<Home/>} />

        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
