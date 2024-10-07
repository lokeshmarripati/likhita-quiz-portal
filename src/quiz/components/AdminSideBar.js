import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styling/admin-side-bar.css'

const AdminSideBar = () => {
    const location = useLocation();
    const admin= location.state.admin;
    const navigate= useNavigate()
    return (
        <div className="a-side-bar">
                <h1>Welcome, {admin.name}!</h1>
                {admin.imageUrl && <img src={admin.imageUrl}></img> }
                <p>Email: {admin.email}</p>
                <button onClick={()=>navigate('/login')}>Logout</button>
        </div>
    )
}

export default AdminSideBar;


