import React from "react";
import { TaskItem } from "../Interfaces";
import {MdDeleteForever} from 'react-icons/md';

interface Props {
    task: TaskItem;
    deleteTask(taskNameToDelete:string):void;
}

const TodoTask = ({task, deleteTask}:Props) => {
    return (
        <>
            
               <tr><td> <span>{task.name}</span></td>
                <td><span>{task.due_date}</span></td>
               

            
           <td style={{width:50}}> <button style={{background:"none",border:"none", fontSize:19}} onClick={() => {
                deleteTask(task.name)
            }}>
<MdDeleteForever/>
            </button></td></tr>
        </>
    )
}

export default TodoTask;