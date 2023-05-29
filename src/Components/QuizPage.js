import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { wordsContext } from "../Context/wordsListContext.js";


const QuizPage = () => {

  const { quizQuestions, setQuizquestions, getQuizQuestions } = useContext(wordsContext)

  //!PUAN TABLOSU YAPILACAk
  //!DB den soru cekilecek

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [resultColor, setResultColor] = useState('');
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  //When answer is selected!
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setResultColor('orange');
    let control = setTimeout(() => {
      setShowAnswer(true);
      if (option === quizQuestions[currentQuestion][1].correct_word) {
        setResultColor('green');
      } else {
        setResultColor('red');
      }
      if (currentQuestion === quizQuestions.length - 1) {
        setIsLastQuestion(true);
      }
    }, 2000);
    return () => clearTimeout(control);
  };

  //To new question
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
      setShowAnswer(false);
    }
  };

  //Say something about answer
  const reactAnswer = () => {
    let rightAnswer = quizQuestions[currentQuestion][1].correct_word
    let english_example = quizQuestions[currentQuestion][1].english_example
    let german_example = quizQuestions[currentQuestion][1].german_example
    if (selectedOption === quizQuestions[currentQuestion][1].correct_word) {
      return <div>
              <h1>Bravo! Right Answer : {rightAnswer}</h1>
              <h3>{english_example}</h3>
              <h3>{german_example}</h3>
            </div>
    } else {
      return "Sorry! Right answer is : " + rightAnswer
    }
  }

  //Cevap her gösterildiginde puan tablosu hesaplanir
  useEffect(() => {
    getQuizQuestions()
    if (showAnswer) {
      if (selectedOption === quizQuestions[currentQuestion][1].correct_word) {
        setScore(score + 10);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setWrongAnswers(wrongAnswers + 1);
      }
      const timer = setTimeout(() => {
        setShowAnswer(false);
        setSelectedOption('');
        setCurrentQuestion(currentQuestion + 1);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [showAnswer]);


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
                className="w-50 m-2"
              >
                {option}
              </Button> 
            ))
            }
            </div>
          <div className='text-center'>{showAnswer ? reactAnswer() : "Result of question "}</div>
          {showAnswer && isLastQuestion ? (
            <div className='text-center'>
              <p>Quiz completed!</p>
              <Button variant="success" onClick={handleNextQuestion} disabled={!showAnswer}>Result!</Button>
            </div>
          ) : (
            <div className='text-center'>
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

              <Button variant="outline-info m-2 px-5 w-50" size="lg" >Soru Sayisi: {quizQuestions.length}</Button>
              <Button variant="outline-success px-5 m-2 w-50" size="lg">Doğru Cevap Sayısı: {correctAnswers}</Button>
              <Button variant="outline-danger px-5 m-2 w-50" size="lg">Yanlış Cevap Sayısı: {wrongAnswers}</Button>
              <Button variant="outline-warning px-5 m-2 w-50" size="lg">Alınan Puan: {quizQuestions.length * 10 + "/" + score}</Button>
            </div>
          </div>
        )}
    </div>
  );
};

export default QuizPage;
