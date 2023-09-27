import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';



function Register() {

    const [user, setuser] = useState([])
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            fname: "",
            lname: "",
            password: "",
            phone: "",

        },
        validate: (values) => {
            let error = {}
            if (!values.fname) {
                error.fname = "First Name is required";
            } else if (values.fname.length <= 3) {
                error.fname = "Length should be more than 3 Characters"
            }
            if (!values.lname) {
                error.lname = "Last name is required";
            }
            if (!values.email) {
                error.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Email a valid Email"
            }
            if (!values.password) {
                error.password = "Please enter Password";
            } else if (values.password.length < 8) {
                error.password = 'Length should be more than 8 Characters';
            }
            if (!values.phone) {
                error.phone = "Phone number is required";
            }

            return error

        },
        onSubmit: async (values) => {
            try {

                let users = await axios.post("https://todo-s14w.onrender.com/register", values);
                setuser(users.data)
                alert("Registered Successfully");
                formik.resetForm();
                navigate("/");
            } catch (error) {

                console.log(error);
            }

        }

    })


    return (
        <>


            <div className='row justify-content-center align-items-center mt-5'>

                <div className="col-md-9 col-lg-6 col-xl-4 h-70 shadow p-3 mb-5 rounded" style={{ backgroundColor: "skyblue" }}>
                    <h3 className='text-center'>Registration Form </h3><hr />
                    <form onSubmit={formik.handleSubmit}>
                        <div className='row ml-1'>
                            <div className='form-group col-lg-6'>
                                <label style={{ fontSize: "18px", fontFamily: "cursive" }}>First Name</label>
                                <input
                                    name='fname'
                                    value={formik.values.fname}
                                    onChange={formik.handleChange}

                                    type={"text"}
                                    className={`form-control ${formik.errors.fname ? "is-invalid" : "is-valid"} `}
                                ></input>
                                <span style={{ fontSize: "16px", fontFamily: "cursive", color: "red" }}>{formik.errors.fname}</span>
                            </div>
                            <div className='form-group col-lg-6'>
                                <label style={{ fontSize: "18px", fontFamily: "cursive" }}>Last Name</label>
                                <input className={`form-control ${formik.errors.lname ? "is-invalid" : "is-valid"} `}
                                    name='lname'
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.lname}
                                ></input>
                                <span style={{ fontSize: "16px", fontFamily: "cursive", color: "red" }}>{formik.errors.lname}</span>
                            </div>
                        </div>
                        <div className='form-group col-lg-12'>
                            <label style={{ fontSize: "18px", fontFamily: "cursive" }}>Email</label>
                            <input className={`form-control ${formik.errors.email ? "is-invalid" : "is-valid"} `}

                                name='email'
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                placeholder='Enter your Email'></input>
                            <span style={{ fontSize: "16px", fontFamily: "cursive", color: "red" }}>{formik.errors.email}</span>
                        </div>





                        <div className='form-group col-lg-12'>
                            <label style={{ fontSize: "18px", fontFamily: "cursive" }}>Password</label>
                            <input className={`form-control ${formik.errors.password ? "is-invalid" : "is-valid"} `}
                                name='password'
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
                                placeholder='Enter your password' ></input>
                            <span style={{ fontSize: "16px", fontFamily: "cursive", color: "red" }}>{formik.errors.password}</span>
                        </div>
                        <div className='form-group col-lg-12'>
                            <label style={{ fontSize: "18px", fontFamily: "cursive" }}>Phone Number</label>
                            <input className={`form-control ${formik.errors.phone ? "is-invalid" : "is-valid"} `}
                                name='phone'
                                onChange={formik.handleChange}
                                type="text"
                                value={formik.values.phone}
                                placeholder='Enter your phone Number'></input>
                            <span style={{ fontSize: "16px", fontFamily: "cursive", color: "red" }}>{formik.errors.phone}</span>
                        </div>
                        <div className='form-group col-lg-12'>
                            <button type='submit' className='btn btn-success rounded col-lg-12 justify-content-center align-items-center'>Submit</button>

                            <NavLink to={'/'}> <button type='button' className='btn btn-success rounded col-lg-12 justify-content-center align-items-center mt-2'>Login</button></NavLink>

                        </div><hr />
                    </form>
                </div>
            </div >

        </>
    )
}

export default Register