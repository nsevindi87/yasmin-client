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
            
            <Form.Group className='mb-3'>
              <Form.Label>Text Title</Form.Label>
              <Form.Control onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} type="textarea" id='title' value={textNewInputValue.title} />
            </Form.Group>

            <Form.Group >
              <Form.Label>English</Form.Label>
              <Form.Control  onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='english' value={textNewInputValue.english} style={{ height: '100px' }}/>
            </Form.Group>

            <Form.Group className='my-4' >
              <Form.Label>German</Form.Label>
              <Form.Control onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='german' value={textNewInputValue.german} style={{ height: '100px' }}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Turkish</Form.Label>
              <Form.Control onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='turkish' value={textNewInputValue.turkish} style={{ height: '100px' }}/>
            </Form.Group>

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