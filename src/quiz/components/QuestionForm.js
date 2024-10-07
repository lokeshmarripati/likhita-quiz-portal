import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styling/question-form.css'
import AdminSideBar from './AdminSideBar';

const QuestionForm = () => {
    const [technology, setTechnology] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const admin= location.state.admin;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (technology && numQuestions > 0) {
            navigate(`/create-questions?tech=${technology}&num=${numQuestions}`, {state: {admin}});
        }
    };

    return (
        <div className='q'>
            <div className='left'>
                <AdminSideBar/>
            </div>
            <div className='right'>

            <h2>Select Technology and Create Questions</h2>

            <form onSubmit={handleSubmit} className='q-form'>
                <label>
                    Select Technology:
                    <select value={technology} onChange={(e) => setTechnology(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JS">JS</option>
                        <option value="REACT">REACT</option>
                    </select>
                </label>
                <br />
                <label>
                    Number of Questions:
                    <input
                        type="number"
                        value={numQuestions}
                        min={0}
                        onChange={(e) => setNumQuestions(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            </div>

        </div>
    );
};

export default QuestionForm;