import { List, TaskItem } from "../Interfaces";

function moveElement(array:Array<TaskItem>, fromIndex:number, toIndex:number) {
    const element = array.splice(fromIndex,1)[0];
   let arr = array.splice(toIndex,0, element);
   return arr;

}

export default moveElement