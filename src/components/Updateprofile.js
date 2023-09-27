import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

function Updateprofile() {

    const [isupdating, setupdating] = useState(false);
    const [isloading,setloading]=useState(true)
    const navigate = useNavigate();

    const params = useParams();
    useEffect(() => {
        getuser()
    }, [])
    let getuser = async () => {
        try {
            const user = await axios.get(`https://todolistbackend-54sh.onrender.com/profile/${params.id}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }

            })
            formik.setValues(user.data)
            setloading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            phone: ""

        },
        validate: (values) => {
            let errors = {}
            if (!values.fname) {
                errors.fname = " First Name is required"
            }
            if (!values.lname) {
                errors.lname = " Last Name is required"
            }
            if (!values.email) {
                errors.email = "Email is required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Enter a valid email"
            }

            if (!values.phone) {
                errors.phone = "Number is required"
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {

                setupdating(true)
                const user = await axios.put(`https://todolistbackend-54sh.onrender.com/update/${params.id}`, values, {
                    headers: {
                        Authorization: `${window.localStorage.getItem("token")}`
                    }

                })

                alert("update done")

                navigate(`/portal/profile`)
            } catch (error) {
                console.log(error)
            }

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
                    <div className='row'>
                        <div className='col-lg-6'>
                            <label > First Name</label>
                            <input type='text'
                                name='fname'
                                value={formik.values.fname}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.fname ? "is-invalid" : "is-valid"}`} />
                            <span style={{ color: "red" }}>{formik.errors.fname}</span>
                        </div>
                        <div className='col-lg-6'>
                            <label >Last Name</label>
                            <input type='text'
                                name='lname'
                                value={formik.values.lname}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.lname ? "is-invalid" : "is-valid"}`} />
                            <span style={{ color: "red" }}>{formik.errors.lname}</span>
                        </div>

                        <div className='col-lg-6'>
                            <label >Email</label>
                            <input type='email'
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.email ? "is-invalid" : "is-valid"}`} />
                            <span style={{ color: "red" }}>{formik.errors.email}</span>
                        </div>

                        <div className='col-lg-6'>
                            <label > Phone Number</label>
                            <input type='text'
                                name='phone'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.phone ? "is-invalid" : "is-valid"}`} />
                            <span style={{ color: "red" }}>{formik.errors.phone}</span>
                        </div>


                        <div className='col-lg-3 mt-4 '>
                            <input type={"submit"} disabled={isupdating} value={isupdating ? "Updating..." : "Update"}
                                className='btn btn-primary' />
                            <Link to={`/portal/profile`} className='btn btn-primary ml-2 '>Back</Link>
                        </div>


                    </div>
                </form >
            </div>
}
        </>
    )
}

export default Updateprofile