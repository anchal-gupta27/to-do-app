import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import baseURL from "../requests/BaseURL";
import endpoints from '../requests/EndPoints';
import { TaskItem } from '../Interfaces';
import UpdateTodoTask from '../Components/UpdateTodoTask';
import { GrEdit } from 'react-icons/gr';
import "../Assets/css/UpdateLists.css"
import { MdEdit, MdOutlineArrowBackIos } from 'react-icons/md';

const UpdateLists: React.FC = () => {

    const [item, setItem] = useState<string>("")
    const [details, setDetails] = useState<string>("")
    const [dueDate, setDueDate] = useState<string>("")
    const [list, setList] = useState<TaskItem[]>([])
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [editName, setEditName] = useState<boolean>(false)
    const [editDesc, setEditDesc] = useState<boolean>(false)

    const { id } = useParams()

    useEffect(() => {

        const fetchListDetails = async () => {
            try {
                const res = await baseURL.get(`${endpoints.lists}/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                setName(res.data.name)
                setDescription(res.data.description)
                setList(res.data.tasks)
            } catch (error) {

            }
        }
        fetchListDetails()
    }, [])

    const updateList = async (data: object) => {

        console.log(data);

        try {
            await baseURL.put(`${endpoints.lists}/${id}`, data)
        } catch (error) {

        }
    }


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "listName") {
            setName(event.target.value)
        }
        // updateList({
        //     name: event.target.value,
        //     description:description,
        //     tasks: list
        // })
    }

    const handleDescChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "listDesc") {
            setDescription(event.target.value)
        }
        // updateList({
        //     name: name,
        //     description:event.target.value,
        //     tasks: list
        // })
    }

    const deleteTask = (taskNameToDelete: string) => {

        let newList = list.filter((item) => {
            return item.name !== taskNameToDelete
        })

        setList(newList)
        updateList({
            name: name,
            description: description,
            tasks: newList
        })


    }

    const editTask = (taskName: string, taskDueDate: string, index: number) => {
        let newList = list
        newList[index].name = taskName;
        newList[index].due_date = taskDueDate;
        setList(newList)
        updateList({
            name: name,
            description: description,
            tasks: newList
        })
    }

    const taskCompleted = (status: boolean, index: number) => {
        let newList = list
        newList[index].status = status
        setList(newList)
        updateList({
            name: name,
            description: description,
            tasks: newList
        })
    }

    const handleItemChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'task') {
            setItem(event.target.value);
        } else if (event.target.name === 'details') {
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


    const editNamePut = () => {
        setEditName(false);
        updateList({
            name: name,
            description: description,
            tasks: list
        })
    }

    const editDescPut = () => {
        setEditDesc(false);
        updateList({
            name: name,
            description: description,
            tasks: list
        })
    }

    return <div className='update-lists'>
        <Link to={"/"}> <MdOutlineArrowBackIos style={{ fontSize: 25 }} /></Link>
        <div className='row flex-wrap-reverse'>
            <div className='col-md-8'>
                <div className='list-details'>
                    {
                        !editName && <span className='d-flex align-items-center list-name'>
                            <h2>{name} </h2>
                            <button  className='edit-button' style={{ fontSize: "25px" }} onClick={() => setEditName(true)}><GrEdit/></button></span>
                    }
                    {
                        editName && <span className='edit-list-name'><input
                            type="text"
                            name="listName"
                            placeholder='Add a name'
                            value={name}
                            onChange={handleChange}


                        />
                            <button onClick={() => editNamePut()}>done</button>
                        </span>
                    }
                </div>
                <div className='list-details'>
                    {
                        !editDesc && <span className='d-flex align-items-center list-desc'><p className='mb-0 mr-4'>{description} </p>
                            <button  className='edit-button'  onClick={() => setEditDesc(true)}><GrEdit className='edit-button' /></button></span>
                    }
                    {
                        editDesc && <span className='edit-list-desc'><input
                            type="text"
                            name="listDesc"
                            placeholder='Description...'
                            value={description}
                            onChange={handleDescChange}


                        />
                            <button onClick={() => editDescPut()}>done</button>
                        </span>
                    }
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Task</th>
                                <th>Due date</th>
                                <th> Status</th>
                                <th></th>
                                <th></th>
                            </tr>

                            {
                                list && list.map(((item: TaskItem, key: number) =>
                                    <UpdateTodoTask
                                        key={key}
                                        index={key}
                                        task={item}
                                        deleteTask={deleteTask}
                                        editTask={editTask}
                                        taskCompleted={taskCompleted} />
                                ))
                            }

                        </tbody>
                    </table>
                </div>

            </div>
            <div className='col-md-4'>

                <div className='task-form'>
                    <h3>Add the tasks</h3>
                    <div className='task-form-item'>
                        <label>Enter the task name</label>
                        <input
                            type="text"
                            name="task"
                            placeholder='Add a task'
                            value={item}
                            onChange={handleItemChange}
                        />

                    </div>
                    <div className='task-form-item'>
                        <label>Enter the duedate</label>

                        <input
                            type="text"
                            name="duedate"
                            placeholder='Add a deadline'
                            value={dueDate}
                            onChange={handleItemChange}

                        />

                    </div>
                    <button onClick={setItemInList}>
                        Submit
                    </button>
                </div>



            </div>


        </div>
    </div>
}

export default UpdateLists