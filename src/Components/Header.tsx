import React from 'react';
import "../Assets/css/Header.css"

const Header:React.FC = () => {
    return <div className='header'>
        <div className='d-flex justify-content-between'>
            <p className='mb-0'>To Do List App</p>
            <p className='mb-0'>Welcome</p>
        </div>

    </div>
}

export default Header