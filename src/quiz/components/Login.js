import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/login.css'
import login from '../assets/login2.jpg'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [popupVisible, setPopupVisible] = useState(false);
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        const {email, password } = formData;

        try {
            const adminResponse = await axios.get('http://localhost:3000/admin'); 
            const admins = adminResponse.data;
            const admin = admins.find(u => u.email === email && u.password === password);

            if (admin) {
                navigate('/admin', { state: { admin } });  // Navigate to admin page if credentials match admin
                return;
            }

            const userResponse = await axios.get('http://localhost:3000/users'); 
            const users = userResponse.data;
            const user = users.find(u => u.email === email && u.password === password);
            const loggedInUser = users.find(u => u.email === email && u.password === password);

            if (user) {
                setUser(loggedInUser);
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                navigate('/user', { state: { user } });  // Navigate to user page if credentials match user
                return;
            }
            setPopupVisible(true);

        } catch (error) {
            console.error('Error checking credentials:', error);
        }
    };

    const handleSignIn = () => {
        // Navigate to sign-in page
        navigate('/sign-in');
    };

    const handleClosePopup = () => {
        setPopupVisible(false);  // Hide popup
    };

    return (
        <div className='login'>
            
            <div className='l-right'>
            <h2>Login</h2>

            <form>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        required
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <br/>
                <p>New User? Please Sign In</p>
                <button type="button" onClick={handleLogin}>Login</button>
                <button type="button" onClick={handleSignIn}>Sign In</button>
            </form>

            {/* Popup for invalid login */}
            {popupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Please sign in before logging in.</p>
                        <button onClick={handleClosePopup}>Cancel</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default Login;