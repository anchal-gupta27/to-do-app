import React from 'react';
import "../Assets/css/Header.css"
import {AiFillSchedule} from "react-icons/ai"

const Header:React.FC = () => {
    return <div className='header'>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'> 
                <p style={{fontSize:24,margin:0}}> <AiFillSchedule /></p>
            <p className='mb-0 mx-2'>To Do List App</p> 

            </div>
            {/* <p className='mb-0'>Welcome</p> */}
        </div>

    </div>
}

export default Header