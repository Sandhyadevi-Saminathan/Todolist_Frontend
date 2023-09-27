import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'



function Portal() {
    return (
        <>
            <div id="wrapper" >

            




                <div id="content-wrapper" className="d-flex flex-column" >
                    <div id="content" >

                        <Topbar></Topbar >


                        <div className="container-fluid" style={{ paddingTop: "10px", paddingLeft: "260px" }}>

                            <Outlet ></Outlet>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default Portal