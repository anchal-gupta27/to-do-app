import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TodoTask from '../Components/TodoTask';
import { TaskItem } from '../Interfaces';
import baseURL from "../requests/BaseURL";
import endpoints from '../requests/EndPoints';
import { List } from '../Interfaces';
import { MdOutlineArrowBackIos } from 'react-icons/md'
import "../Assets/css/Home.css";
import "../Assets/css/UpdateLists.css"
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

    const [item, setItem] = useState<string>("")
    const [details, setDetails] = useState<string>("")
    const [dueDate, setDueDate] = useState<string>("")
    const [list, setList] = useState<TaskItem[]>([])
    const [listData, setListData] = useState<List>({
        name: "undefined",
        id: "0",
        description: "description",
        tasks: []

    })
    const { id } = useParams();

    useEffect(() => {
        const fetchListDetails = async () => {
            try {
                const res = await baseURL.get(`${endpoints.lists}/${id}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                setListData(res.data)
                setList(res.data.tasks)
            } catch (error) {

            }
        }
        fetchListDetails()
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'task') {
            setItem(event.target.value);
        } else if (event.target.name === 'details') {
            setDetails(event.target.value)
        } else {
            setDueDate(event.target.value)
        }


    }

    const updateList = async (data: object) => {



        try {
            const res = await baseURL.put(`${endpoints.lists}/${id}`, data)
        } catch (error) {

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

    const deleteTask = (taskNameToDelete: string) => {

        let newList = list.filter((item) => {
            return item.name != taskNameToDelete
        })

        setList(newList)
        updateList({
            name: listData.name,
            description: listData.description,
            tasks: newList
        })
    }



    return (
        <div className='home'>
            <Link to={"/"}> <MdOutlineArrowBackIos style={{ fontSize: 25 }} /></Link>
            <div className='row felx-wrap-reverse'>
                <div className='col-md-8'>
                    <h1>{listData.name}</h1>
                    <p>{listData.description}</p>
                    <div>
                        <table>
                            <tbody>
                                <tr>

                                    <th>Task</th>
                                    <th>Due date</th>
                                    <th></th>
                                </tr>
                                {
                                    list && list.map((item: TaskItem, key: number) =>
                                        <TodoTask key={key} task={item} deleteTask={deleteTask} />
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-md-4'>

                    <div>


                        <div className='task-form'>
                            <h3>Add the tasks</h3>
                            <div className='task-form-item'>
                                <label>Enter the task name</label>
                                <input
                                    type="text"
                                    name="task"
                                    placeholder='Add a task'
                                    value={item}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='task-form-item'>
                                <label>Enter the duedate</label>
                                <input
                                    type="text"
                                    name="duedate"
                                    placeholder='Add a deadline'
                                    value={dueDate}
                                    onChange={handleChange}

                                />

                            </div>
                            <button onClick={setItemInList}>
                                Submit
                            </button>
                        </div>






                    </div>
                </div>

            </div>

        </div>
    );
}

export default Home;