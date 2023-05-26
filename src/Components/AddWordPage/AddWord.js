import React, { useContext } from 'react';
import { Container, FloatingLabel, Form, Button,Row,Col} from 'react-bootstrap';
import AddWordUnterList from './AddWordUnterList';
import {wordsContext} from "../../Context/wordsListContext"

const AddWord = () => {
  const { inputValue, setInputValue, handleNewWord } = useContext(wordsContext)

  return (
    <>
      <Container className='bg-light' style={{height:"100vh"}}>
        <Row>
          <Col>
            <h1 className='mt-5 text-center'>Add New Data</h1>

            <FloatingLabel label="First Value">
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} type="text" id='word' value={inputValue.word} />
            </FloatingLabel>

            <FloatingLabel label="Second Value">
              <Form.Control className='mt-4' onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} type="text" id='wordMeaning' value={inputValue.wordMeaning} />
            </FloatingLabel>

            <FloatingLabel className='my-4' label="Third Value" >
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} type="text" id='wordSecondMeaning' value={inputValue.wordSecondMeaning} />
            </FloatingLabel>

            <FloatingLabel  label="Notes">
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} as="textarea" id='wordNote' value={inputValue.wordNote} style={{ height: '100px' }}/>
            </FloatingLabel>

            <div className='mt-4'>
              <Button variant="danger w-50">Cancel</Button>
              <Button onClick={handleNewWord} variant="primary w-50">Add</Button>
            </div><br />
            <hr />
            <h1 className='mt-2 text-center'>Recently Added</h1>
            <AddWordUnterList/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddWord