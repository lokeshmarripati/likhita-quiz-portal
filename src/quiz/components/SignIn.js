import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/signin.css'
import signin from '../assets/signin.png'

const SignIn = () => {
    const [formData, setFormData] = useState({ name: '', email: '', role: '', password: '', imageUrl: '',score:[] });
    const [popupVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData({
          ...formData,
          image: file,
        });
      };

    const handleRoleChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
    };

    const handleSignIn = async () => {
        const { name, email, role, password, imageUrl} = formData;

        try {
            // Determine the correct endpoint based on the selected role
            const endpoint = role === 'admin' ? `http://localhost:3000/admin/${formData.image.name}` : `http://localhost:3000/users/${formData.image.name}`;

            if (role === 'admin') {
                const adminResponse = await fetch('http://localhost:3000/admin', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: formData.name,
                      email: formData.email,
                      password: formData.password,
                      imageUrl: endpoint,
                    }),
                  });
              
                setPopupVisible(true)
            } else {
                const userResponse = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: formData.name,
                      email: formData.email,
                      password: formData.password,
                      imageUrl: endpoint,
                      score: []
                    }),
                  });
                  setPopupVisible(true)
            }
            
        }
        catch{
           alert('could not sign in.. please enter valid details.') 
        }
    };

    const handleGoToLogin = () => {
        // Hide the popup and navigate back to the login page
        // setPopupVisible(false);
        navigate('/login');
    };

    return (
        <div className='signin'>
            <h2>Please Sign In to create your account..</h2> 
            <img src={signin}/>
            <div className='s-right'>
            {/* <h2>Sign In</h2> */}
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        className='input'
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        className='input'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        className='input'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <br /><label>
                    Profile:
                    <input
                        type="file"
                        name="profile"
                        className='input'
                        value={formData.imageUrl}
                        onChange={handleImageChange}
                    />
                </label>
                <br />
                <label>
                    Sign in as:
                    <label className='role'>
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={formData.role === 'user'}
                            onChange={handleRoleChange}
                        />
                        User
                    
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={formData.role === 'admin'}
                            onChange={handleRoleChange}
                        />
                        Admin
                    </label>
                </label>
                <p>Already a user? Please Login</p>
                <button type="button" onClick={handleSignIn}>Sign In</button>
            </form>

            {/* Popup for successful sign in */}
            {popupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <p style={{color: 'black', marginLeft: '0%', textAlign: 'center'}}>You have successfully signed in! You can now login.</p>
                        <button onClick={handleGoToLogin} style={{color: 'black', marginLeft: '5%', backgroundColor: 'orange'}}>Go to Login</button>
                    </div>
                </div>
            )}
             </div>
        </div>
    );
};

export default SignIn;