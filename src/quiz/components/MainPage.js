import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styling/main.css'
import quiz from '../styling/quiz-bg.png'

const MainPage = () => {
    const navigate = useNavigate()

    return (
        <div className='main-page'>
            <p className='head'>
                <p>
                    <h1>Welcome Quiztie..</h1>
                </p>
            </p>
            <img src={quiz}></img>
            <div className='right'>
                <p>Learn and grow with our online quiz portal..</p>
                <button onClick={() => navigate('/login')}>Let's get Started</button>
            </div>
        </div>
    )
}

export default MainPage;