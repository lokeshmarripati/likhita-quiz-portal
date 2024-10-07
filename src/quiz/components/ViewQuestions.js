
import React, { useContext } from 'react';
import { QuestionsContext } from '../QuestionsContext';
import { Link } from 'react-router-dom';

const ViewQuestions = () => {
    const { questions } = useContext(QuestionsContext);

    return (
        <div>
            <h2>View All Questions</h2>
            {questions.map((q, index) => (
                <div key={index}>
                    <h3>Question {index + 1}: {q.question}</h3>
                    {q.options.map((option, i) => (
                        <p key={i}>{i + 1}. {option}</p>
                    ))}
                    <p>Answer: {q.answer}</p>
                    <hr />
                </div>
            ))}
            <Link to="/questions/:technology">
                <button>Attempt Questions</button>
            </Link>
        </div>
    );
};

export default ViewQuestions;