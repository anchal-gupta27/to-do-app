import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import baseURL from "../requests/BaseURL";
import endpoints from '../requests/EndPoints';
import { List } from '../Interfaces';
import { TaskItem } from '../Interfaces';
import UpdateTodoTask from '../Components/UpdateTodoTask';

const UpdateLists:React.FC = () =>{ 

    const [item, setItem] = useState<string>("")
    const [details, setDetails] = useState<string>("")
    const [dueDate, setDueDate] = useState<string>("")
    const [list, setList] = useState<TaskItem[]>([])
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [editName, setEditName] = useState(false)
    const [editDesc, setEditDesc] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        const fetchListDetails = async () => {
            try {
                const res = await baseURL.get(`${endpoints.lists}/${id}`)
                setName(res.data.name)
                setDescription(res.data.description)
                setList(res.data.tasks)
            } catch (error) {
                
            }
        }
        fetchListDetails()
    }, [])

    const updateList = async (data:object) => {

        

        try{
            const res = await baseURL.put(`${endpoints.lists}/${id}`, data)
        } catch(error) {

        }
    }


    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.name="listName") {
            setName(event.target.value)
        }
    }

    const handleDescChange = (event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.name="listDesc") {
            setDescription(event.target.value)
        }
    }

    const deleteTask = (taskNameToDelete:string) => {

        let newList = list.filter((item) => {
         return item.name != taskNameToDelete
     })
 
         setList(newList)
         updateList({
             name:name,
             description:description,
             tasks: newList
         })
     }
 
     const editTask = (taskName:string, taskDueDate:string, index:number) => {
        let newList = list
        newList[index].name = taskName;
        newList[index].due_date = taskDueDate;
        setList(newList)
        updateList({
            name: name,
            description:description,
            tasks:newList
        })
     }

     const taskCompleted = (status:boolean, index:number) => {
        let newList = list
        newList[index].status = status
        setList(newList)
        updateList({
            name: name,
            description:description,
            tasks:newList
        })
     }
    
     const handleItemChange = (event:ChangeEvent<HTMLInputElement>) => {
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
         status: false
        }
        setList([...list, newTask]);
        updateList({
         name: name,
         description: description,
         tasks: [...list, newTask]
        })
        setItem("");
        setDetails("");
        setDueDate("");
        console.log(list)
     }

    return<div>
        <div className='row'>
            <div className='col-9'>
               <div>
               {
                    !editName && <span><h1>{name} </h1> <button onClick={() => setEditName(true)}>edit</button></span>
                }
                {
                    editName && <span><input 
                        type="text"
                        name="listName"
                        placeholder='Add a name'
                        value={name}
                        onChange={handleChange}
                        
                        
                    />
                    <button onClick={() => setEditName(false)}>done</button>
                    </span>
                }
               </div>
               <div>
               {
                    !editDesc && <span><h1>{description} </h1> <button onClick={() => setEditDesc(true)}>edit</button></span>
                }
                {
                    editDesc && <span><input 
                        type="text"
                        name="listDesc"
                        placeholder='Description...'
                        value={description}
                        onChange={handleDescChange}
                        
                        
                    />
                    <button onClick={() => setEditDesc(false)}>done</button>
                    </span>
                }
               </div>
               <div>
                {
                    list && list.map(((item:TaskItem, key:number) =>
                        <UpdateTodoTask key={key} index={key} task={item} deleteTask={deleteTask} editTask={editTask} taskCompleted={taskCompleted}/>
                    ))
                }
               </div>

            </div>
            <div className='col-3'>
                <input 
                    type="text"  
                    name="task"
                    placeholder='Add a task'
                    value = {item}
                    onChange={handleItemChange}
                />
                  <input 
                type="text"
                name="duedate"
                placeholder='Add a deadline'
                value={dueDate}
                onChange={handleItemChange}

            />
             <button onClick={setItemInList}>
                Add
            </button>
            </div>
           

        </div>
    </div>
}

export default UpdateLists