import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate ,useParams } from 'react-router-dom';
import axios from 'axios';
import '../styling/choose-questions.css';
import scoreImg from '../assets/score.png';
import UserSideBar from './UserSideBar';

const AttemptTechnologyQuestions = () => {
    const { technology } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Fetch questions for the selected technology
                const response = await axios.get(`http://localhost:3000/questions?technology=${technology}`);
                if (response.data.length > 0) {
                    setQuestions(response.data[0].questions);
                    setAnswers(new Array(response.data[0].questions.length).fill(null)); // Initialize answers
                    console.log(response.data[0].questions)
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [technology]);

    const handleAnswerChange = (value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = value;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleFinish = async () => {
        // Calculate the score by comparing answers
        let totalScore = 0;
        questions.forEach((question, index) => {
            if (answers[index] === question.answer) {
                totalScore += 1;
            }
        });
        setScore(totalScore);

        try {
           
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
            if (!loggedInUser || !loggedInUser.id) {
                console.error('User is not logged in or ID is missing');
                alert('There was a problem retrieving your user data. Please log in again.');
                navigate('/login'); 
                return; 
            }
    
            const userId = loggedInUser.id;  
     
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            const user = response.data;
              
            const scores = Array.isArray(user.scores) ? user.scores : [];
               
            const updatedUser = {
                ...user,
                scores: [
                    ...scores,
                    {
                        technology: technology,      
                        score: totalScore,            
                        totalQuestions: questions.length  
                    }
                ]
            };
            await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
    
            console.log('Score saved successfully!');
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    if (score !== null) {
        return (
            <div className='score'>
                <div className='left'>
                    <UserSideBar></UserSideBar>
                </div>

                <img src={scoreImg}/>

                <div className='score-r'>
                    <h2>Your Score: {score} / {questions.length}</h2>
                    <button onClick={()=>navigate('/login')}>Return</button>
                </div>

                {/* <div className='btn'>
                    <button onClick={()=>navigate('/login')}>Go Back</button>
                </div> */}

            </div>
        );
    }

    return (
        <div className='choose-questions'>
            <div className='left'>
                <UserSideBar/>
            </div>
            <div>
            <h2>Attempt Questions for {technology}</h2>
            {questions.length === 0 ? (
                <p>No questions available.</p>
            ) : (
                <div className='question'>
                    <h3>Question {currentQuestionIndex + 1}</h3>
                    <p>{questions[currentQuestionIndex].question}</p>
                    {questions[currentQuestionIndex].options.map((option, idx) => (
                        <div key={idx}>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${currentQuestionIndex}`}
                                    value={option}
                                    checked={answers[currentQuestionIndex] === option}
                                    onChange={() => handleAnswerChange(option)}
                                />
                                {option}
                            </label>
                        </div>
                    ))}

                    <div className='btn'>
                        {currentQuestionIndex < questions.length - 1 ? (
                            <button onClick={handleNext}>Next</button>
                        ) : (
                            <button onClick={handleFinish}>Finish</button>
                        )}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default AttemptTechnologyQuestions;