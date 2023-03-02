import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TodoTask from '../Components/TodoTask';
import { TaskItem } from '../Interfaces';
import baseURL from "../requests/BaseURL";
import endpoints from '../requests/EndPoints';
import { List } from '../Interfaces';

const Home:React.FC = () =>{ 

    const [item, setItem] = useState<string>("")
    const [details, setDetails] = useState<string>("")
    const [dueDate, setDueDate] = useState<string>("")
    const [list, setList] = useState<TaskItem[]>([])
    const [listData, setListData] = useState<List>({
        name:"undefined",
        id: "0",
        description:"description",
        tasks:[]

    })
    const {id} = useParams();

    useEffect(() => {
        const fetchListDetails = async () => {
            try {
                const res = await baseURL.get(`${endpoints.lists}/${id}`)
                setListData(res.data)
                setList(res.data.tasks)
            } catch (error) {
                
            }
        }
        fetchListDetails()
    },[])

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === 'task') {
            setItem(event.target.value);
        } else if(event.target.name === 'details') {
           setDetails(event.target.value)
        } else {
            setDueDate(event.target.value)
        }

        
    }

    const updateList = async (data:object) => {

        

        try{
            const res = await baseURL.put(`${endpoints.lists}/${id}`, data)
        } catch(error) {

        }
    }

    const setItemInList = () => {
       const newTask = {
        name: item,
        details: details,
        due_date: dueDate,
        status: false
       }
       setList([...list, newTask]);
       updateList({
        name: listData.name,
        description: listData.description,
        tasks: [...list, newTask]
       })
       setItem("");
       setDetails("");
       setDueDate("");
       console.log(list)
    }

    const deleteTask = (taskNameToDelete:string) => {

       let newList = list.filter((item) => {
        return item.name != taskNameToDelete
    })

        setList(newList)
        updateList({
            name:listData.name,
            description:listData.description,
            tasks: newList
        })
    }



    return (
       <div>

        <div className='row'>
            <div className='col-3'>
            <div>
            <h1>{listData.name}</h1>
            <p>{listData.description}</p>

            
            <input 
            type="text"  
            name="task"
            placeholder='Add a task'
            value = {item}
            onChange={handleChange}
            />
            <input 
                type="text"
                name="details"
                placeholder='Add the description'
                value={details}
                onChange={handleChange}

            />
            <input 
                type="text"
                name="duedate"
                placeholder='Add a deadline'
                value={dueDate}
                onChange={handleChange}

            />
            <button onClick={setItemInList}>
                Add
            </button>
           
        </div>
            </div>
            <div className='col-9'>
            <div>
                {
                    list && list.map((item:TaskItem, key:number) => 
                       <TodoTask key={key} task={item} deleteTask={deleteTask} />
                    )
                }
            </div>

            </div>

        </div>

       </div>
    );
}

export default Home;