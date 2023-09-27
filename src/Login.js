import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            let error = {}
            if (!values.email) {
                error.email = "Please enter Email";
            }
            if (!values.password) {
                error.password = "Please enter Password";
            }
            return error

        },
        onSubmit: async (values) => {
            try {
                let userData = await axios.post('https://todolistbackend-54sh.onrender.com/login', values);
               

                window.localStorage.setItem("token", userData.data.token);
                window.localStorage.setItem("ID", userData.data.user._id)
                window.localStorage.setItem("name", userData.data.user.fname)
                alert("Login Succes");


                navigate(`/portal/todolist`)
            } catch (error) {
                alert('Invalid email/password')
                console.error(error);
            }


        }
    })

    return (
        <div className="container">
 <div className='row justify-content-center align-items-center mt-5'>
            {/* <!-- Outer Row --> */}

               
            <div className="col-md-9 col-lg-6 col-xl-4 h-70 shadow p-3 mb-5 rounded" >
                   
                        {/* <div className="card-body p-0"> */}
                            {/* <!-- Nested Row within Card Body --> */}
                          


                               
                                    <div className="p-5" style={{ color: "tomato", fontSize: "18px", fontFamily: "cursive" }}>
                                        <div className="text-center" >
                                            <h1 className="h4 text-gray-900 mb-4" style={{ fontSize: "25px", fontFamily: "cursive" }}>Welcome!</h1>
                                        </div>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className='form-group col-lg-10 ' >
                                                <label>Email</label>
                                                <input className={`form-control ${formik.errors.email ? "is-invalid" : ""} `}
                                                    name='email'
                                                    type="email"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                    placeholder='Enter your Email' style={{ border: "2px solid skyblue" }}></input>
                                                <span style={{ color: "red" }}>{formik.errors.email}</span>
                                            </div>
                                            <div className='form-group col-lg-10'>
                                                <label>Password</label>
                                                <input className={`form-control ${formik.errors.password ? "is-invalid" : ""} `}
                                                    name='password'
                                                    onChange={formik.handleChange}
                                                    type="password"
                                                    value={formik.values.password}
                                                    placeholder='Enter your password' style={{ border: "2px solid skyblue" }}></input>
                                                <span style={{ color: "red" }}>{formik.errors.password}</span>
                                            </div>
                                            <div className='form-group col-lg-12 '>
                                                <button type='submit' className='btn btn-info rounded col-lg-12 justify-content-center mt-5 align-items-center'>Log in</button>
                                            </div><hr />

                                        </form>

                                        <div className="text-center">
                                            <Link to='/forget'>
                                                <div className="medium" >Forgot Password?</div></Link>
                                        </div>
                                        <Link to="/register">
                                            <div className="text-center">
                                                <div className="medium mt-2">Create an Account! </div>
                                            </div></Link>
                                
                                </div>
                            </div>
                        </div>
                       
             </div>

           

      
    )
}

export default Login