import React, { ChangeEvent, useEffect, useState } from 'react';
import baseURL from "../requests/BaseURL";
import endpoints from '../requests/EndPoints';
import { List } from '../Interfaces';
import { Link } from 'react-router-dom';
import "../Assets/css/Lists.css"
import DeleteModal from '../Components/DeleteModal';
import { MdDeleteForever } from 'react-icons/md';

const Lists:React.FC = () =>{ 

    const [lists, setLists] = useState<List[]>([]);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const [listToDelete, setListToDelete] = useState<List>({
        name:"",
        id:"",
        description:"",
        tasks:[]
    })

    const [listDeleted, setListDeleted] = useState(false)

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
     
        if(event.target.name === 'title') {
            setTitle(event.target.value);
        } else if(event.target.name === 'desc') {
           setDesc(event.target.value)
        } 
    }

    const postList = async() => {

        if(title==="" || desc==="") {
            return alert("Please enter the details")
        }

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
                setListDeleted(false)
            } catch(error) {
                console.log(error)
            }
        }
        fetchLists()
    },[listDeleted])

    return <>
    <div className='create-list'>
        <div className='row flex-wrap-reverse'>
            <div className='col-md-8 lists'>

             <div className='mt-2'>
             <h2>Continue where you left!</h2>
               <div className='list-items'>
               {
                    lists&&lists.map((item, i) => 
                    <div  className=' list-container d-flex justify-content-between'>
                        <Link className='p-2' to={`/to-do-list-details/${item.id}/update`}>
                        <div  
                       
                        key={item.id}>
                    <p className='mb-0'>{item.name}</p>

                </div></Link>
                <div className='p-2 delete-button'><button onClick={() => {setShowModal(true); setListToDelete(item)}}  style={{background:"none",border:"none"}}><MdDeleteForever/></button></div>
                    </div>
                    )
                }
               </div>
             </div>
            </div>
            <div className='col-md-4'>
                <div className='list-form'>
                <div className='list-form-header'>
                <h3>Create a to-do List!!</h3>
                </div>
               <div className='list-form-details'> 
               <div className='list-form-item'>
                <label>Enter name of the list</label>
                <input 
            type="text"  
            name="title"
            placeholder=''
            value = {title}
            onChange={handleChange}
            />
                </div>
           <div className='list-form-item'>
           <label>Enter the description</label>
            <input 
                type="text"
                name="desc"
                placeholder=''
                value={desc}
                onChange={handleChange}

            />
           </div>
           <div style={{textAlign:"center"}}>
           <button onClick={() => postList()}>Submit</button>
           </div>
               </div>
                </div>
            </div>


        </div>
      
    </div>
    <DeleteModal 
         list={listToDelete}
         onClose = {() => setShowModal(false)} 
         listDeleted = {() => setListDeleted(true)}
         show={showModal} />
</>
}

export default Lists

