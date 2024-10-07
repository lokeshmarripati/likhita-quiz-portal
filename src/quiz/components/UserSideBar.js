import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styling/user-side-bar.css'

const UserSideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div className='u-side-bar'>
                <h1>Welcome, {user.name}!</h1>
                {user.imageUrl && <img src={user.imageUrl}></img> }
                <p>Email: {user.email}</p>
                <button onClick={()=> navigate('/login')}>Logout</button>
        </div>
    )
}

export default UserSideBar;