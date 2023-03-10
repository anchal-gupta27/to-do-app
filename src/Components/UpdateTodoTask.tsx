import React, { useState, ChangeEvent, useEffect } from "react";
import { TaskItem } from "../Interfaces";
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
import "../Assets/css/UpdateLists.css"

interface Props {
    index: Number;
    task: TaskItem;
    deleteTask(taskNameToDelete: string): void;
    taskCompleted(taskStatus: boolean, index: Number): void;
    editTask(name: string, duedate: string, index: Number): void;
}

const UpdateTodoTask = ({ index, task, deleteTask, taskCompleted, editTask }: Props) => {

    const [name, setName] = useState(task.name)
    const [dueDate, setDueDate] = useState(task.due_date)
    const [status, setStatus] = useState(task.status)
    let green = "rgb(181 249 181)";

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setName(task.name)
        setDueDate(task.due_date)
        setStatus(task.status)
    }, [task, index])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'taskName') {
            setName(event.target.value);
        } else if (event.target.name === 'dueDate') {
            setDueDate(event.target.value)
        }


    }

    const taskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.checked)
        taskCompleted(e.target.checked, index)
    }

    return (
        <>
            <tr>


                <td style={status ? { background: green } : {}}><input
                    type="checkbox"
                    name="status"
                    id="status"
                    checked={status}
                    onChange={(e) => taskStatus(e)}
                /></td>
                {
                    !edit &&
                    <>
                        <td style={status ? { background: green, textDecoration: "line-through", width: 175 } : { width: 175 }}><span>{name}</span></td>
                        <td style={status ? { background: green, width: 100 } : { width: 100 }}>   <span>{dueDate}</span></td>
                        <td style={status ? { background: green } : {}}> <span>{status ? "Completed" : "Pending"}</span></td>
                        <td style={status ? { background: green } : {}}><button style={{ background: "none", border: "none", fontSize: "15px" }} onClick={() => { setEdit(true) }}>
                            <GrEdit />
                        </button></td>

                    </>

                }

                {
                    edit &&

                    <td style={{ width: 175 }} > <input
                        type="text"
                        name="taskName"
                        placeholder="Task name"
                        value={name}
                        onChange={handleChange}
                    /></td>



                }

                {
                    edit && <td> <input
                        type="text"
                        name="dueDate"
                        placeholder="Duedate"
                        value={dueDate}
                        onChange={handleChange}
                    /></td>
                }

                {
                    edit && <td style={status ? { background: green } : {}}> <span>{status ? "Completed" : "Pending"}</span></td>
                }

                {
                    edit && <td><button className="edit-task-button" onClick={() => { setEdit(false); editTask(name, dueDate, index) }}>Done</button></td>

                }



                <td style={status ? { background: green } : {}}><button style={{ background: "none", border: "none", fontSize: 19 }} onClick={() => {
                    deleteTask(task.name)
                }}>
                    <MdDeleteForever />
                </button></td>
            </tr>
        </>
    )

}

export default UpdateTodoTask