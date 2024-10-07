import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styling/admin.css'
import AdminSideBar from './AdminSideBar';

const AdminPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const admin= location.state.admin;

    const handleQuestionForm = () => {
        // Navigate to page to select technology to create quiz
        navigate('/question-form', {state: {admin}});
    };

    const handleResults = () => {
        navigate('/view-results', {state: {admin}})
    }

    return (
        <div className='admin'>
            <div className='left'>
                <AdminSideBar/>
            </div>
            <div className='right'>
                <button onClick={handleQuestionForm}>Choose Technology for Creating Quiz</button>
                <hr></hr>
                <button onClick={handleResults}>View Results</button>
            </div>   
        </div>
    );
};

export default AdminPage;