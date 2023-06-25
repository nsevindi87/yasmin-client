import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table, FloatingLabel, Form, Button } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext.js";
import { PencilSquare, Trash3Fill } from 'react-bootstrap-icons'



const QuizQuestions = () => {
  const { getAllQuizQuestions, allQuizQuestions, handleNewQuestion, quizNewInputValue, setQuizNewInputValue, handleQuestionCancel, handleQuestionDelete, handleQuestionEdit, handleQuestionUpdate, showUpdateQuiz, setShowUpdateQuiz,showForm, setShowForm } = useContext(wordsContext)

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    getAllQuizQuestions()
  }, [])

  return (
    <Container>
      <Row className='mt-5'>
        <Button variant='warning' className='py-4 mb-2 text-center' onClick={handleShowForm}>Click to Add New Question</Button>
        <Col className={`form-container ${showForm ? 'show' : ''}`}>

          <FloatingLabel label="Question">
            <Form.Control onChange={(e) => setQuizNewInputValue({ ...quizNewInputValue, [e.target.id]: e.target.value })} type="text" id='question_text' value={quizNewInputValue.question_text} />
          </FloatingLabel>

          <FloatingLabel label="Options">
            <Form.Control className='mt-4' onChange={(e) => setQuizNewInputValue({ ...quizNewInputValue, [e.target.id]: e.target.value })} type="text" id='options' value={quizNewInputValue.options} />
          </FloatingLabel>

          <FloatingLabel className='my-4' label="Correct Word" >
            <Form.Control onChange={(e) => setQuizNewInputValue({ ...quizNewInputValue, [e.target.id]: e.target.value })} type="text" id='correct_word' value={quizNewInputValue.correct_word} />
          </FloatingLabel>

          <FloatingLabel label="English Example">
            <Form.Control onChange={(e) => setQuizNewInputValue({ ...quizNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='english_example' value={quizNewInputValue.english_example} style={{ height: '100px' }} />
          </FloatingLabel>

          <FloatingLabel className='my-4' label="German Example">
            <Form.Control onChange={(e) => setQuizNewInputValue({ ...quizNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='german_example' value={quizNewInputValue.german_example} style={{ height: '100px' }} />
          </FloatingLabel>

          <div className='mt-4'>
            <Row>
              <Col>
                <Button onClick={handleQuestionCancel} variant="danger" className=' w-100'>Cancel</Button>
              </Col>
              <div style={{ width: '10px' }}></div> {/* Ara boşluk */}
              <Col>
                {showUpdateQuiz ? <Button onClick={handleQuestionUpdate} variant="warning" className='w-100'>Update</Button> : <Button onClick={handleNewQuestion} variant="primary w-100">Add</Button>}
              </Col>
            </Row>
          </div>
          <br />
          <hr />
        </Col>
      </Row>
      <Row className='my-1' >
        <Button variant='warning' className='py-4 mt-1 mb-2 text-center' >All Quiz Questions</Button>
        <Col>
          <h4 className=' border-1 text-center shadow my-4 py-3'>Total <span style={{ color: 'red' }}>{allQuizQuestions.length}</span> questions are found!</h4>
          <div style={{ height: '500px', overflowY: 'scroll' }}>
            <Table striped bordered hover variant="dark" style={{ maxWidth: '100%' }}>
              <thead style={{ position: 'sticky', top: 0, overflowY: 'scroll' }}>
                <tr className='text-center'>
                  <th >#</th>
                  <th>Actions</th>
                  <th>Question</th>
                  <th>Options</th>
                  <th>Correct</th>
                  <th>English Example</th>
                  <th>German Example</th>
                </tr>
              </thead>
              <tbody>
                {allQuizQuestions?.map((question, value) => (
                  <tr key={value} className='text-center'>
                    <td>{value + 1}</td>
                    <td>
                      <Button onClick={() => handleQuestionEdit(question[1])} variant="warning me-1 px-1" className='mb-1 p-0'><PencilSquare /></Button>
                      <Button onClick={() => handleQuestionDelete(question[1].id)} variant="danger px-1" className='mb-1 p-0'><Trash3Fill /> </Button>
                    </td>
                    <td>{question[1].question_text}</td>
                    <td>{question[1].options}</td>
                    <td>{question[1].correct_word}</td>
                    <td>{question[1].english_example}</td>
                    <td>{question[1].german_example}</td>
                  </tr>
                )).reverse()}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

    </Container>
  )
}

export default QuizQuestions