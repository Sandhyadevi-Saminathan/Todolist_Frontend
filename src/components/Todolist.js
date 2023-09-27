import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

function Todolist() {
    const [pgloading, setpgloading] = useState(true)
    const ids = localStorage.getItem('ID')
    const [todo, settodo] = useState(true)
    const [tododet, settododet] = useState([])
    useEffect(() => {
        gettodo()


    }, [])

    let gettodo = async () => {
        const todo = await axios.get(`http://localhost:5000/todo/${ids}`, {
            headers: {
                Authorization: `${window.localStorage.getItem("token")}`
            }

        })
        settododet(todo.data)
        setpgloading(false)

    }

    const formik = useFormik({
        initialValues: {
            todo: "",

        },


        validate: (values) => {

            let errors = {}
            if (!values.todo) {
                errors.todo = "Enter your Todo List"
            }

            return errors;
        },
        onSubmit: async (values) => {
            setpgloading(true)
            values.id = ids
            const task = await axios.post(`http://localhost:5000/todo`, values, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }

            })


            formik.resetForm()
            gettodo()
            settodo(true)
        }
    })
    let handledelete = async (id) => {

        try {
            const confirm = window.confirm("Are u sure?")
            if (confirm) {

                await axios.delete(`http://localhost:5000/todo/${id}`, {
                    headers: {
                        Authorization: `${window.localStorage.getItem("token")}`
                    }
                })

                alert('Deleted')
                gettodo()
            }
        }
        catch (error) {
            console.log(error)
            alert("Something went wronmg")
        }


    }
    return (

        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div class="Navbar_navbar__container__3Q3Zl">
                            <div class="sc-jTrPJq gFWlwy">
                                <button onClick={() => {
                                    settodo(false)
                                }} class="NavButtons_add__button__q_2E5" style={{ fontSize: "18px", fontFamily: "cursive" }}>
                                    <img src="https://cdn-icons-png.flaticon.com/128/3018/3018447.png" alt="add/plus" style={{ width: "25px" }} />Create Your Todo</button>
                            </div>
                        </div>
                        {!todo ?
                            (
                                <form onSubmit={formik.handleSubmit}>
                                    <div class="col-lg-6">
                                        <br />
                                        <label for="appealSolvedSolutionArea" style={{ color: "rgb(126, 142, 159)" }}>Enter your Todo list
                                        </label><br />
                                        <textarea
                                            name='todo'
                                            value={formik.values.todo}
                                            onChange={formik.handleChange}
                                            className={`form-control `} />
                                        <span style={{ color: "red" }}>{formik.errors.todo}</span>

                                    </div>
                                    <div class="col-12">
                                        <input type={"submit"} value={"Submit"}
                                            className='btn btn-primary mt-3' />
                                        <button type="submit" onClick={() => { settodo(true) }} class="btn btn-primary mt-3 ml-3">Back</button>
                                    </div>
                                </form>
                            )


                            :
                            null
                        }

                    </div>
                    <div className='col-lg-6'>
                        {pgloading ? (<div class="col d-flex justify-content-center" >
                            <h1 style={{ color: "tomato", maxwidth: "10rem", fontSize: "40px", fontFamily: "cursive" }}>Loading</h1>
                        </div>) : (tododet.length == "" ?
                            (<h2 style={{ fontSize: "18px", fontFamily: "cursive" }}>No Todo's to display</h2>)
                            : (
                                <div class="card ">
                                    <div class="card-body ">
                                    <h3 style={{ color: "tomato", fontSize: "18px", fontFamily: "cursive" }}>Todo List :</h3>
                                    <br/>

                                        {tododet.map((todo) => {
                                            return <>

                                                
                                                 <h5 class="card-text" style={{ color: "black" }}>{todo.todo}
                                                    <Link to={`/portal/viewtodo/${todo._id}`} className='btn btn-info btn-sm mr-1 ml-3'>View</Link>
                                                        <Link to={`/portal/edittodo/${todo._id}`} className='btn btn-primary btn-sm mr-1'>Edit</Link>
                                                        <button onClick={() => {
                                                            handledelete(todo._id)
                                                        }} className='btn btn-danger btn-sm mr-1'>Delete</button></h5>
                                                        <br/>

                                              


                                            </>
                                        })}

                                    </div>
                                </div>
                            )
                        )}


                    </div>
                </div>

            </div>


        </>
    )
}

export default Todolist