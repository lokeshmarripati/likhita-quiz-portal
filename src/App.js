import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './quiz/components/Login';
import AdminPage from './quiz/components/Admin';
import UserPage from './quiz/components/User';
import './quiz/components/popup.css'
import QuestionForm from './quiz/components/QuestionForm';
import CreateQuestions from './quiz/components/CreateQuestions';
import SignIn from './quiz/components/SignIn';
import AttemptQuestions from './quiz/components/AttemptQuestions';
import AttemptTechnologyQuestions from './quiz/components/AttemptTechmologyQuestions';
import QuizPopup from './quiz/components/QuizPopup';
import ViewResults from './quiz/components/ViewResults'
import MainPage from './quiz/components/MainPage';

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null)
    
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage/>}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path='/question-form' element={<QuestionForm/>}/>
                <Route path="/create-questions" element={<CreateQuestions />} />
                {/* <Route path='/quiz-popup' element={<QuizPopup/>}/> */}
                {/* <Route path="/questions/start" element={<AttemptQuestions />} /> */}
                <Route path="/questions/:technology" element={<AttemptTechnologyQuestions />} />
                <Route path='/view-results' element={<ViewResults/>}/>
            </Routes>
        </Router> 

    );
}

export default App;
