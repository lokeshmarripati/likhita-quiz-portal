import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/results.css';
import AdminSideBar from './AdminSideBar'
import results from '../assets/results.png'

const ViewResults = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location= useLocation();
    const admin = location.state.admin;
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className='results'>
            <div className='left'>
            <AdminSideBar></AdminSideBar>
            </div>

            <div className='right'>

            <h2>Results</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table border="0" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Technology</th>
                            <th>Score</th>
                            <th>Total Questions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            // Ensure scores is an array
                            const scores = user.scores || [];
                            
                            return scores.length > 0 ? (
                                scores.map((score, index) => (
                                    <tr key={`${user.id}-${index}`}>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={scores.length}>
                                                    <img 
                                                        src={user.imageUrl} 
                                                        alt={user.name} 
                                                    />
                                                </td>
                                                <td rowSpan={scores.length}>{user.name}</td>
                                                <td rowSpan={scores.length}>{user.email}</td>
                                            </>
                                        )}
                                        <td>{score.technology}</td>
                                        <td>{score.score}</td>
                                        <td>{score.totalQuestions}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr key={user.id}>
                                    <td>
                                        <img 
                                            src={user.imageUrl} 
                                            alt={user.name} 
                                            style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td colSpan="3">No scores available</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
                       

            <button className='btn' onClick={() => navigate('/admin',{state:{admin}})}>
                GoBack
                </button>
            </div>

        </div>
    );
};

export default ViewResults;
