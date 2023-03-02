import React from "react";
import { TaskItem } from "../Interfaces";

interface Props {
    task: TaskItem;
    completeTask(taskNameToDelete:string):void;
}

const TodoTask = ({task, completeTask}:Props) => {
    return (
        <div className="task d-flex">
            <div className="content d-flex">
                <span>{task.name}</span>
                <span>{task.due_date}</span>
                <span>{task.status}</span>

            </div>
            <button onClick={() => {
                completeTask(task.name)
            }}>
X
            </button>
        </div>
    )
}

export default TodoTask;