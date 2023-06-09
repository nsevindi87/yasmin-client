import React,{useContext, useState, useEffect} from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext.js";


const QuizStatistics = () => {
  const { getAllQuizQuestions,allQuizQuestions,} = useContext(wordsContext)

  useEffect(()=>{
    getAllQuizQuestions()
  },[])
  
  return (
    <Container>
      <Row className='mt-5' >
        <Col>
          <h1 className=' border-1 text-center shadow'>All Quiz Questions</h1>
          <h4 className=' border-1 text-center shadow'>Total <span style={{ color: 'red' }}>{allQuizQuestions.length}</span> questions are found!</h4>
          <hr></hr>
          <div style={{ height: '500px', overflowY: 'scroll' }}>
          <Table striped bordered hover variant="dark" style={{ maxWidth: '100%'}}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'red',overflowY: 'scroll' }}>
              <tr className='text-center'>
                <th style={{ backgroundColor: '#c3c7c9' }}>#</th>
                <th style={{ backgroundColor: '#c3c7c9' }}>Question</th>
                <th style={{ backgroundColor: '#c3c7c9' }}>Options</th>
                <th style={{ backgroundColor: '#c3c7c9' }}>Correct</th>
                <th style={{ backgroundColor: '#c3c7c9' }}>English Example</th>
                <th style={{ backgroundColor: '#c3c7c9' }}>German Example</th>
              </tr>
            </thead>
            <tbody>
              {allQuizQuestions?.map((question, value) => (
                <tr key={value} className='text-center'>
                  <td>{value + 1}</td>
                  <td>{question[1].question_text}</td>
                  <td>{question[1].options}</td>
                  <td>{question[1].correct_word}</td>
                  <td>{question[1].english_example}</td>
                  <td>{question[1].german_example}</td>
                </tr>
              ))}
            </tbody>
          </Table>
              </div>
        </Col>
      </Row>
      
    </Container>
  )
}

export default QuizStatistics