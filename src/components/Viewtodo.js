import React, { useContext } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Viewtodo() {
   
    
  
    const [isloading, setloading] = useState(true)
    const [todo, settodo] = useState([])
    const params = useParams();
    useEffect(() => {
        gettodo()
    }, [])
    let gettodo = async () => {
        try {
            const datas = await axios.get(`http://localhost:5000/todos/${params.id}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            });
            settodo(datas.data)
            console.log(datas.data)
            setloading(false)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {isloading ? (
                <div class="col d-flex justify-content-center">
                    <h1>Loading</h1>
                </div>

            )
                :
                <div class="col d-flex justify-content-center">
                    <div class="card text-white bg-primary mb-3" style={{ width: "30rem" }}>
                        <div class="card-body">
                            <h4 class="card-title" style={{ textAlign: "center", color: "black" }} >Todolist</h4>
                            <br/>
                            <h5 class="card-text" > {todo.todo}</h5>
                           <br/>
                           
                                    <th>
                                        <Link to={`/portal/edittodo/${todo._id}`} className="btn btn-danger mr-2 mt-2">Edit</Link>
                                        <Link to={`/portal/todolist`} className='btn btn-danger mr-2 mt-2'>Back</Link>
                                    </th>
                           


                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default Viewtodo