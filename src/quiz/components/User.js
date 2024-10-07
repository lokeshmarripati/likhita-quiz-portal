import '../styling/user.css' 
import UserSideBar from './UserSideBar';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/tech.css'
import css from './css.jpeg'

const UserPage = () => {
    const [technologies, setTechnologies] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state.user;

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const res = await axios.get('http://localhost:3000/technologies');
                setTechnologies(res.data);
            } catch (error) {
                console.error('Error fetching technologies:', error);
            }
        };

        fetchTechnologies();
    }, []);

    
    // const user = JSON.parse(localStorage.getItem('user'))
    const handleAttemptClick = async (tech) => {
            navigate(`/questions/${tech.name}`, {state: {user}});
        // navigate(`/quiz-popup`);
    };

    const handleQuestions = (technology) => {
        // Navigate to page to select technology to create quiz
        navigate(`/quiz-popup`);
    };

    return (
        <div className='user'>
                <UserSideBar/>
            <div className='right'>
                {/* <p>You are on the user dashboard.</p> */}
                {/* <button onClick={handleQuestions}>Attempt Quiz</button> */}
                <h2>Select Technology to Attempt Questions</h2>
                <ul>
                    {technologies.map((tech) => (
                        <p key={tech.id}>
                            <button onClick={() => handleAttemptClick(tech)}>
                                <img src={tech.image}/>
                                <p>Attempt {tech.name} Questions</p>
                            </button>
                        </p>
                    ))}
                </ul>
            </div>
            
        </div>
    );
};

export default UserPage;