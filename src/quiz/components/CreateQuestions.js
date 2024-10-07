import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/create-questions.css'
import AdminSideBar from './AdminSideBar';

const CreateQuestions = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const technology = queryParams.get('tech');
    const numQuestions = parseInt(queryParams.get('num'), 10);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionData, setQuestionData] = useState(new Array(numQuestions).fill({
        question: '',
        options: ['', '', '', ''],
        answer: '',
    }));

    const [currentInputData, setCurrentInputData] = useState({
        question: '',
        options: ['', '', '', ''],
        answer: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        if (field === 'question') {
            setCurrentInputData({ ...currentInputData, question: value });
        } else if (field.startsWith('option')) {
            const optionIndex = parseInt(field.replace('option', ''), 10);
            const updatedOptions = [...currentInputData.options];
            updatedOptions[optionIndex] = value;
            setCurrentInputData({ ...currentInputData, options: updatedOptions });
        } else if (field === 'answer') {
            setCurrentInputData({ ...currentInputData, answer: value });
        }
    };

    const handleNext = () => {
        const updatedData = [...questionData];
        updatedData[currentQuestion] = currentInputData;
        setQuestionData(updatedData);

        // Reset input fields for next question
        setCurrentInputData({
            question: '',
            options: ['', '', '', ''],
            answer: '',
        });

        setCurrentQuestion(currentQuestion + 1);
    };

    const handleFinish = async () => {
        const updatedData = [...questionData];
        updatedData[currentQuestion] = currentInputData;
        
        // Send data to fake server
        try {
            await axios.post('http://localhost:3000/questions', {
                technology,
                questions: updatedData,
            });
            navigate('/login');
        } catch (error) {
            console.error('Error saving questions:', error);
        }
        alert('questions are created successfully')
    };

    return (
        <div className='create-q'>
            <div className='left'>
                <AdminSideBar/>
            </div>
            <h2>Question {currentQuestion + 1} of {numQuestions}</h2>
            <form className='form'>
                <label>
                    Question:
                    <input
                        type="text"
                        value={currentInputData.question}
                        onChange={(e) =>
                            handleInputChange('question', e.target.value)
                        }
                    />
                </label>
                <br />
                {[0, 1, 2, 3].map((optionIndex) => (
                    <div key={optionIndex}>
                        <label>
                            Option {optionIndex + 1}:
                            <input
                                type="text"
                                value={currentInputData.options[optionIndex]}
                                onChange={(e) =>
                                    handleInputChange(`option${optionIndex}`, e.target.value)
                                }
                            />
                        </label>
                    </div>
                ))}
                <br />
                <label>
                    Answer:
                    <input
                        type="text"
                        value={currentInputData.answer}
                        onChange={(e) =>
                            handleInputChange('answer', e.target.value)
                        }
                    />
                </label>
            </form>
            <br />
            <div className='btn'>
                {currentQuestion < numQuestions - 1 ? (
                    <button onClick={handleNext}>Next</button>
                ) : (
                    <button onClick={handleFinish}>Finish</button>
                )}
            </div>
        </div>
    );
};

export default CreateQuestions;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CreateQuestions = () => {
//     const [technology, setTechnology] = useState('');
//     const [numQuestions, setNumQuestions] = useState(0);
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestion, setCurrentQuestion] = useState('');
//     const [options, setOptions] = useState(['', '', '', '']);
//     const [correctAnswer, setCorrectAnswer] = useState('');
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const navigate = useNavigate();

//     // const handleTechnologyChange = (e) => {
//     //     setTechnology(e.target.value);
//     // };

//     // const handleNumQuestionsChange = (e) => {
//     //     setNumQuestions(e.target.value);
//     // };

//     const handleQuestionChange = (e) => {
//         setCurrentQuestion(e.target.value);
//     };

//     const handleOptionChange = (index, value) => {
//         const updatedOptions = [...options];
//         updatedOptions[index] = value;
//         setOptions(updatedOptions);
//     };

//     const handleNext = () => {
//         const questionData = {
//             question: currentQuestion,
//             options: options,
//             correctAnswer: correctAnswer
//         };

//         // Add the current question to the questions array
//         setQuestions([...questions, questionData]);

//         // Clear input fields for the next question
//         setCurrentQuestion('');
//         setOptions(['', '', '', '']);
//         setCorrectAnswer('');

//         // Move to the next question or finish
//         if (currentIndex + 1 < numQuestions) {
//             setCurrentIndex(currentIndex + 1);
//         } else {
//             // Save questions to the selected technology in the fake server
//             saveQuestions();
//         }
//     };

//     const saveQuestions = async () => {
//         try {
//             const res = await axios.get(`http://localhost:3001/technologies?name=${technology}`);
//             const tech = res.data[0];

//             if (tech) {
//                 // Add new questions to the existing questions array of the technology
//                 const updatedQuestions = [...tech.questions, ...questions];

//                 await axios.put(`http://localhost:3001/technologies/${tech.id}`, {
//                     ...tech,
//                     questions: updatedQuestions
//                 });

//                 alert('Questions saved successfully!');
//                 navigate('/questions/:technology');
//             }
//         } catch (error) {
//             console.error('Error saving questions:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Create Questions</h2>
//             {/* <label>
//                 Select Technology:
//                 <input type="text" value={technology} onChange={handleTechnologyChange} />
//             </label>
//             <br />
//             <label>
//                 Number of Questions:
//                 <input type="number" value={numQuestions} onChange={handleNumQuestionsChange} />
//             </label>
//             <br /> */}
//             <label>
//                 Question {currentIndex + 1}:
//                 <input type="text" value={currentQuestion} onChange={handleQuestionChange} />
//             </label>
//             <br />
//             <label>Options:</label>
//             <br />
//             {options.map((option, index) => (
//                 <input
//                     key={index}
//                     type="text"
//                     value={option}
//                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                 />
//             ))}
//             <br />
//             <label>
//                 Correct Answer:
//                 <input
//                     type="text"
//                     value={correctAnswer}
//                     onChange={(e) => setCorrectAnswer(e.target.value)}
//                 />
//             </label>
//             <br />
//             {currentIndex + 1 < numQuestions ? (
//                 <button onClick={handleNext}>Next</button>
//             ) : (
//                 <button onClick={handleNext}>Finish</button>
//             )}
//         </div>
//     );
// };

// export default CreateQuestions;