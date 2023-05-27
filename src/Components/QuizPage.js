import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const QuizPage = () => {
  const questions = [
    {
      question: 'Soru 1: Hangi programlama dili React.js ile birlikte kullanılır?',
      options: ['Python', 'Java', 'JavaScript', 'C++'],
      correctAnswer: 'JavaScript',
    },
    {
      question: 'Soru 2: React.js hangi şirket tarafından geliştirilmiştir?',
      options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
      correctAnswer: 'Facebook',
    },
    {
      question: 'Soru 3: React.js hangi tür bir kütüphanedir?',
      options: ['CSS', 'JavaScript', 'HTML', 'PHP'],
      correctAnswer: 'JavaScript',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [resultColor, setResultColor] = useState('');
  const [isLastQuestion, setIsLastQuestion] = useState(false);


  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    setResultColor('orange');

    let control = setTimeout(() => {
      setShowAnswer(true);

      if (option === questions[currentQuestion].correctAnswer) {
        setResultColor('green');
      } else {
        setResultColor('red');
      }

      if (currentQuestion === questions.length - 1) {
        setIsLastQuestion(true);
      }

    }, 2000);
    return () => clearTimeout(control);

  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
      setShowAnswer(false);
    }
  };

  const cevapReaksiyon = () => {
    let rightAnswer = questions[currentQuestion].correctAnswer
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      return "Bravo! Answer is : " + rightAnswer
    } else {
      return "Sorry! Right answer is : " + rightAnswer
    }
  }

  useEffect(() => {
    if (showAnswer) {
      
      
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
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

  const renderOptions = () => {
    return questions[currentQuestion].options.map((option, index) => {
      return (
        <Button variant="outline-dark" size="lg" 
          key={index}
          onClick={() => handleOptionSelect(option, index)}
          style={{ backgroundColor: selectedOption === option && resultColor }}
          className="w-50 m-2"
        >
          {option}
        </Button>
      );
    });
  };

  return (
    <div>
      {currentQuestion < questions.length ? (
        <div >
          <h2 className='text-center mt-5 mb-2'>{questions[currentQuestion].question}</h2>
          <div className='text-center'>{renderOptions()}</div>
          <div className='text-center'>{showAnswer ? cevapReaksiyon() : "Result of question "}</div>
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
          )}

        </div>
      ) : (
        <div>
          <h2>Quiz Tamamlandı</h2>
          <p>Soru Sayısı: {questions.length}</p>
          <p>Doğru Cevap Sayısı: {correctAnswers}</p>
          <p>Yanlış Cevap Sayısı: {wrongAnswers}</p>
          <p>Alınan Puan: {score}</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
