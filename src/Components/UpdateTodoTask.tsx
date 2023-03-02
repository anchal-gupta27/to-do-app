import React, { useState, ChangeEvent, useEffect } from "react";
import { TaskItem } from "../Interfaces";

interface Props {
    index:Number;
    task:TaskItem;
    deleteTask(taskNameToDelete:string):void;
    taskCompleted(taskStatus:boolean, index:Number):void;
    editTask(name:string,duedate:string,index:Number):void;
}

const UpdateTodoTask = ({index, task, deleteTask, taskCompleted, editTask}:Props) => {

    const [name, setName] = useState(task.name)
    const [dueDate, setDueDate] = useState(task.due_date)
    const [status, setStatus] = useState(task.status)
    
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setName(task.name)
        setDueDate(task.due_date)
        setStatus(task.status)
    },[task,index])

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === 'taskName') {
            setName(event.target.value);
        } else if(event.target.name === 'dueDate') {
           setDueDate(event.target.value)
        } 

        
    }

    const taskStatus = (e:React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.checked)
        taskCompleted(status, index)
    }

    return (
        <div className="task d-flex">
        <div className="content d-flex">
            <input
            type="checkbox"
            name="status"
            id="status"
            checked={status}
            onChange={taskStatus}
             />
           {
            !edit && <div>
                 <span>{name}</span>
            <span>{dueDate}</span>
            <span>{status?"Completed":"Pending"}</span>
            <button onClick={() => {setEdit(true)}}>
            edit
        </button>
            </div>
            

           }
           {
            edit&& <div>

                <input 
                    type="text"
                    name="taskName"
                    placeholder="Task name"
                    value={name}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    name="dueDate"
                    placeholder="Duedate"
                    value={dueDate}
                    onChange={handleChange}
                />

                <button onClick={() => {setEdit(false); editTask(name,dueDate,index)}}>Done</button>
            </div>
           }

        </div>
        
        <button onClick={() => {
            deleteTask(task.name)
        }}>
X
        </button>
    </div>
    )

}

export default UpdateTodoTask