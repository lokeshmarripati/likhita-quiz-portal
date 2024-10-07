import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/tech.css'
import css from './css.jpeg'
import UserSideBar from './UserSideBar';

const AttemptQuestions = () => {
    const [technologies, setTechnologies] = useState([]);
    const navigate = useNavigate();

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

    const handleAttemptClick = (tech) => {
        navigate(`/questions/${tech.name}`);
    };

    return (
        <div className='tech'>
            <div className='left'>
                <UserSideBar/>
            </div>
            <div>
                <h2>Select Technology to Attempt Questions</h2>
                <ul>
                    {technologies.map((tech) => (
                        <p key={tech.id}>
                            <button onClick={() => handleAttemptClick(tech)}>
                                <img src={css}/>
                                Attempt {tech.name} Questions
                            </button>
                        </p>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AttemptQuestions; 