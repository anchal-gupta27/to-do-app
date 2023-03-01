import React, { useState } from 'react';


const Home:React.FC = () =>{ 

    const [title, setTitle] = useState("Untitled")
    const [description, setDescription] = useState("Description....")
    const [item, setItem] = useState("")
    const [list, setList] = useState([
        {
            id:1,
            name:"work"
        }
    ])

    const setItemInList = () => {
        let arr = list 
        let new_item: {

        }
    }

    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>

            <div>
                {
                    list && list.map((item) => 
                        <p>{item.name}</p>
                    )
                }
            </div>

            <input 
            type="text"  
            name="list"
            value = {item}
            onChange={(e) => setItem(e.target.value)}
            />
            <button onClick={() => setItemInList()}>
                Add
            </button>
            
        </div>
    );
}

export default Home;