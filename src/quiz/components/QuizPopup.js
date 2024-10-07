import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QuizPopup = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const navigate = useNavigate()

  // Handler for checkbox change
  const handleCheckboxChange = (event) => {
    setIsTermsAccepted(event.target.checked);
  };

  // Handler for starting the quiz
  const handleStartQuiz = () => {
    if (isTermsAccepted) {
      setIsQuizStarted(true);
      // Logic to start the quiz can be added here
    } else {
      alert('You must accept the terms and conditions to start the quiz.');
    }

    navigate(`/questions/start`)
  };

  return (
    <div className='popup'>
      <div className='popup-content'>
      <h1>Terms and Conditions</h1>
      <p>Please read and accept the terms and conditions before starting the quiz.</p>
      <textarea
        readOnly
        rows="10"
        cols="50"
        value={
          `1. You agree to participate in the quiz.
          \n2. Your data will be used for quiz purposes only.
          \n3. You have to select one option among given choice for each question, in any prferred technology.
          \n4. You can view your score at the end of the quiz.
          \n5. Organizers are not responsible for technical issues and lost entries.`
        }
      />

      <div>
        <input
          type="checkbox"
          id="termsCheckbox"
          checked={isTermsAccepted}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="termsCheckbox">I accept the terms and conditions</label>
      </div>

      <button
        onClick={handleStartQuiz}
        disabled={!isTermsAccepted}
      >
        Start Quiz
      </button>

      {isQuizStarted && <p>Quiz is starting...</p>}
      </div>
    </div>
  );
};
export default QuizPopup