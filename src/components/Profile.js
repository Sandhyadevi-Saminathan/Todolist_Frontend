import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Profile() {

    const [isloading, setloading] = useState(true)
    const ids = localStorage.getItem('ID')
    const navigate = useNavigate()
    const [userList, setUserList] = useState({})

    useEffect(() => {
        fetchUsers()
    }, [])
    let fetchUsers = async () => {
        try {
            let userData = await axios.get(`https://todo-s14w.onrender.com/profile/${ids}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })

            setUserList(userData.data)
            setloading(false)
        } catch (error) {
            console.log('error')
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
                            <h4 class="card-title" style={{ textAlign: "center", color: "black" }} >Profile</h4>
                            <h5 class="card-text" > First Name: {userList.fname}</h5>
                            <h5 class="card-text" >Last Name: {userList.lname}</h5>
                            <h5 class="card-text" >Email: {userList.email}</h5>
                            <h5 class="card-text" >Number: {userList.phone}</h5>


                            <th>
                                <Link to={`/portal/updateprofile/${userList._id}`} className="btn btn-danger mr-2 mt-2">Update</Link>
                                <Link to={`/portal/todolist`} className='btn btn-danger mr-2 mt-2'>Back</Link>
                            </th>



                        </div>
                    </div>
                </div >
            }


        </>
    )
}


export default Profile