import React, { useContext } from 'react'
import { Link } from 'react-router-dom'


function Topbar() {
  
    return (
        <>

            <nav className="  navbar-expand-lg navbar bg-gradient-success topbar topbar-dark accordion mb-4  fixed-top static-top shadow">
                <h3 className='card-text text-left ml-3' style={{ color: "white", fontSize: "25px", fontFamily: "cursive", marginTop: "3" }}> Todo List</h3>
                <div className='divhead ml-5' style={{ borderLeft: "1px solid white", height: "500px" }}></div>
                <h3 className='header mt-4' style={{ fontSize: "30px", fontFamily: "cursive", paddingLeft: "70px" }}> </h3>

                <ul class="navbar-nav ml-auto">
                    <li className="nav-item dropdown no-arrow ">

                        <Link className="nav-link" to="/portal/profile" onClick={(() => {
                            
                        })}
                        >
                            <span className="mr-2 d-none d-lg-inline text-white - 600 medium mb-2" style={{ color: "white", fontSize: "30px", fontFamily: "cursive" }} >
                                {localStorage.getItem('name')}
                            </span>
                        </Link>
                        {/* {/*  */}
                        <Link className="nav-link" onClick={() => {
                            window.localStorage.removeItem("token")
                        }}
                            to="/" >
                            <img className="img-profile rounded-circle mr-3 mb-2"
                                src="https://th.bing.com/th/id/OIP.1asifY692Tb7m4S1HQgVkwHaHa?w=207&h=207&c=7&r=0&o=5&dpr=1.3&pid=1.7" style={{ width: "50px", height: "50px" }} />
                        </Link>



                    </li>
                </ul>
            </nav >









        </>
    )
}

export default Topbar