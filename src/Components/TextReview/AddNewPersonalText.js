import React, { useContext } from 'react'
import { Container, Row, Col, Table, FloatingLabel, Form, Button } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext.js";


const AddNewPersonalText = () => {

  const { textNewInputValue, setTextNewInputValue, showUpdateQuiz, handleTextCancel, handleNewText } = useContext(wordsContext)

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1 className='my-4 text-center border-1 shadow'>Add New Text</h1>

            <FloatingLabel label="Text Title">
              <Form.Control onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} type="textarea" id='title' value={textNewInputValue.title} />
            </FloatingLabel>

            <FloatingLabel label="English">
              <Form.Control className='mt-4' onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='english' value={textNewInputValue.english}  style={{ height: 'auto', minHeight: '3em' }}  />
            </FloatingLabel>

            <FloatingLabel className='my-4' label="German" >
              <Form.Control onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='german' value={textNewInputValue.german} style={{ height: '100px' }} />
            </FloatingLabel>

            <FloatingLabel label="Turkish">
              <Form.Control onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='turkish' value={textNewInputValue.turkish} style={{ height: '100px' }} />
            </FloatingLabel>

            <div className='mt-4'>
              <Row>
                <Col>
                  <Button onClick={handleTextCancel} variant="danger" className=' w-100'>Cancel</Button>
                </Col>
                <div style={{ width: '10px' }}></div> {/* Ara boşluk */}
                <Col>
                  <Button onClick={handleNewText} variant="primary w-100">Add</Button>
                </Col>
              </Row>
            </div>
            <br />
            <hr />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddNewPersonalText