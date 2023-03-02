import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import TodoTask from '../Components/TodoTask';
import { TaskItem } from '../Interfaces';

const Home:React.FC = () =>{ 

    const [title, setTitle] = useState("Untitled")
    const [description, setDescription] = useState("Description....")
    const [item, setItem] = useState<string>("")
    const [details, setDetails] = useState<string>("")
    const [dueDate, setDueDate] = useState<string>("")
    const [list, setList] = useState<TaskItem[]>([])

    useEffect(() => {
        const fetchListDetails = async () => {
            
        }
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

    const setItemInList = () => {
       const newTask = {
        name: item,
        details: details,
        due_date: dueDate,
        status: "incomplete"
       }

       setList([...list, newTask]);
       setItem("");
       console.log(list)
    }

    const completeTask = (taskNameToDelete:string) => {
        setList(list.filter((item) => {
            return item.name != taskNameToDelete
        }))
    }

    return (
       <div>

        <div className='row'>
            <div className='col-3'>
            <div>
            <h1>{title}</h1>
            <p>{description}</p>

            
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
                       <TodoTask key={key} task={item} completeTask={completeTask} />
                    )
                }
            </div>

            </div>

        </div>

       </div>
    );
}

export default Home;