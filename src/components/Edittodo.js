import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

function Edittodo() {
    const [isupdating, setupdating] = useState(false);
    const [isloading, setloading] = useState(true)
    const navigate = useNavigate();

    const params = useParams();
    useEffect(() => {
        gettodo()
    }, [])
    let gettodo = async () => {
        try {
            const todo = await axios.get(`https://todo-s14w.onrender.com/todos/${params.id}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
            formik.setValues(todo.data)
            setloading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
           todo:""

        },
        validate: (values) => {
            let error = {}
            if (!values.todo) {
                error.todo = "Please enter Your Todo";
            } 
            return error;
        },
        onSubmit: async (values) => {
            try {

                setupdating(true)
                const user = await axios.put(`https://todo-s14w.onrender.com/todos/${params.id}`, values, {
                    headers: {
                        Authorization: `${window.localStorage.getItem("token")}`
                    }
                })
                alert("update done")
                console.log(user)
                navigate(`/portal/todolist`)
            } catch (error) {
                console.log(error)
            }
            console.log(values)
        }

    })
    return (
        <>
            {isloading ? (
                <div class="col d-flex justify-content-center">
                    <h1>Loading</h1>
                </div>

            )
                :
                <div className='container'>
                    <form onSubmit={formik.handleSubmit}>

                      
                            <div className='form-group col-lg-4'>
                                <label>Details</label>
                                <textarea className={`form-control ${formik.errors.todo ? "is-invalid" : "is-valid"} `}
                                    name='todo'
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.todo}
                                ></textarea>
                                <span style={{ color: "red" }}>{formik.errors.todo}</span>
                            </div>
                           


                        <div className='col-lg-3 mt-4 '>
                            <input type={"submit"} disabled={isupdating} value={isupdating ? "Updating..." : "Update"}
                                className='btn btn-primary' />
                            <Link to={`/portal/todolist`} className='btn btn-primary ml-2 '>Back</Link>
                        </div>



                    </form >
                </div >
            }
        </>
    )
}

export default Edittodo