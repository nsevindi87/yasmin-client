import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { wordsContext } from "../../Context/wordsListContext.js";
import { UserContext } from '../../Context/UserContext.js';
import { useNavigate } from 'react-router-dom';
import { Toast,ToastContainer } from 'react-bootstrap';


const QuizPage = () => {

  const { quizQuestions, getQuizQuestions } = useContext(wordsContext)
  const { profileInfo, getProfileInfo } = useContext(UserContext)

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [resultColor, setResultColor] = useState('');
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const [showToast, setShowToast] = useState(false);

  //When answer is selected! ====================================================
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setResultColor('orange');
    setTimeout(() => {
      setShowAnswer(true);
      if (option === quizQuestions[currentQuestion][1].correct_word) {
        setResultColor('green');
        setCorrectAnswers(correctAnswers + 1);
        setScore(score => score + 10)
      } else {
        setResultColor('red');
        setWrongAnswers(wrongAnswers + 1);
      }
      if (currentQuestion === quizQuestions.length - 1) {
        setIsLastQuestion(true);
      }
    }, 2000);
  };

  //To new question==============================================================================
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length) {
      setResultColor('');
      setSelectedOption('');
      setShowAnswer(false);
    }
    if (currentQuestion < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };


  //Say something about answer==============================================================================
  const reactAnswer = () => {
    let rightAnswer = quizQuestions[currentQuestion][1].correct_word
    let english_example = quizQuestions[currentQuestion][1].english_example
    let german_example = quizQuestions[currentQuestion][1].german_example

    if (selectedOption === quizQuestions[currentQuestion][1].correct_word) {
      return <div>
        <h1>Bravo! Right Answer :  <span className='text-success'> {rightAnswer}</span></h1>
        <h3 className='text-secondary'>{english_example}</h3>
        <h3 className='text-secondary'>{german_example}</h3>
      </div>
    } else {
      return <div>
        <h1>Sorry! Right answer is : <span className='text-danger'> {rightAnswer}</span></h1>
        <h3 className='text-secondary'>{english_example}</h3>
        <h3 className='text-secondary'>{german_example}</h3>
      </div>
    }
  }

  let navigate = useNavigate();
  //!ISTATISTIKLERI EKLE
  const handleStatistics = async () => {
    const statistics = {
      questions: correctAnswers + wrongAnswers,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
      score: score,
      userId: profileInfo.id
    }

    try {
      const response = await fetch(`http://localhost:3302/quizstatistics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statistics),
      });

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);

      setCorrectAnswers(0)
      setWrongAnswers(0)
      setScore(0)
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    getQuizQuestions()
  }, []);


  return (
    <div>
      {currentQuestion < quizQuestions.length ?
        <div >
          <h2 className='text-center mt-5 mb-2'>{quizQuestions[currentQuestion][1].question_text}</h2>
          <div className='text-center'>
            {quizQuestions[currentQuestion][1].options.split(",").map((option, index) => (
              <Button variant="outline-dark" size="lg"
                key={index}
                onClick={() => handleOptionSelect(option, index)}
                disabled={showAnswer}
                style={{ backgroundColor: selectedOption === option && resultColor }}
                className="w-50 m-2">
                {option}
              </Button>
            ))
            }
          </div>
          <div className='text-center'>{showAnswer ? reactAnswer() : "Result of question "}</div>
          {isLastQuestion ? (
            <div className='text-center'>
              <p>Quiz completed!</p>
              <Button variant="success" onClick={handleNextQuestion} disabled={!showAnswer}>Result!</Button>
            </div>
          ) : (
            <div className='text-center'>
              <br></br>
              <div className='text-center'></div>
              <br></br>
              <Button variant="warning" onClick={handleNextQuestion} disabled={!showAnswer}>Next Question</Button>
              
            </div>
          )
          }
        </div>
        : (
          <div className='text-center'>
            <h2 className='mt-5'>Quiz Completed!</h2>
            <h2 className='mt-2'>Statistics!</h2>
            <div>

              <Button variant="outline-info m-2 px-5 w-50" size="lg" >Soru Sayisi: {correctAnswers + wrongAnswers}</Button>
              <Button variant="outline-success px-5 m-2 w-50" size="lg">Doğru Cevap Sayısı: {correctAnswers}</Button>
              <Button variant="outline-danger px-5 m-2 w-50" size="lg">Yanlış Cevap Sayısı: {wrongAnswers}</Button>
              <Button variant="outline-warning px-5 m-2 w-50" size="lg">Alınan Puan: {(correctAnswers + wrongAnswers) * 10 + "/" + score}</Button>
              <Button variant="dark px-5 mt-4 w-50" size="lg" onClick={handleStatistics}>Click to save statistic and quit!</Button>
              
            </div>
            <ToastContainer className="p-3 " position="bottom-start">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide >
                  <Toast.Body style={{ background: 'green', color: 'white' }}>Your Statistics are saved!</Toast.Body>
                </Toast>
              </ToastContainer>
          </div>
        )}
    </div>
  );
};

export default QuizPage;
