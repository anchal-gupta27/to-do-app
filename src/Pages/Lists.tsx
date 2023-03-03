import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import baseURL from "../requests/BaseURL";
import endpoints from '../requests/EndPoints';
import { List } from '../Interfaces';
import { Link } from 'react-router-dom';
import "../Assets/css/Lists.css"

const Lists:React.FC = () =>{ 

    const [lists, setLists] = useState<List[]>([]);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
     
        if(event.target.name === 'title') {
            setTitle(event.target.value);
        } else if(event.target.name === 'desc') {
           setDesc(event.target.value)
        } 
    }

    const postList = async() => {
        let data = {
            name:title,
            description:desc,
            tasks:[]
        }

        try {
            const res = await baseURL.post(endpoints.lists, data)
            window.open("/to-do-list/"+res.data.id+"/add-tasks", "_self")
            console.log(res.data)
        } catch (error) {

        }
    }


    useEffect(() => {
        const fetchLists = async() => {
            try {
                const res = await baseURL.get(endpoints.lists)
                //console.log(res.data)
                setLists(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        fetchLists()
    },[])

    return <div className='create-list'>
        <div className='row'>
            <div className='col-8 lists'>

             <div>
             <h2>Continue where you left!</h2>
               <div className='list-items'>
               {
                    lists&&lists.map((item, i) => 
                    <Link to={`/to-do-list-details/${item.id}/update`}>
                        <div  
                        className='list-container'
                        key={item.id}>
                    <p className='mb-0'>{item.name}</p>

                </div></Link>
                    )
                }
               </div>
             </div>
            </div>
            <div className='col-4'>
                <div className='list-form'>
                <h3>Create a to-do List!!</h3>
                <div className='list-form-item'>
                <label>Enter name of the list</label>
                <input 
            type="text"  
            name="title"
            placeholder='Add a task'
            value = {title}
            onChange={handleChange}
            />
                </div>
           <div className='list-form-item'>
           <label>Enter the description</label>
            <input 
                type="text"
                name="desc"
                placeholder='Add the description'
                value={desc}
                onChange={handleChange}

            />
           </div>
            <button onClick={() => postList()}>Submit</button>
                </div>
            </div>


        </div>
    </div>

}

export default Lists

