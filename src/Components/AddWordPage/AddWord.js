import React, { useContext, useEffect } from 'react';
import { Container, FloatingLabel, Form, Button,Table,Row,Col} from 'react-bootstrap';
import AsideComponent from '../RightSide/AsideComponent';
import AddWordUnterList from './AddWordUnterList';
import {wordsContext} from "../../Context/wordsListContext"


const AddWord = () => {
  const { inputValue, setInputValue, handleNewWord } = useContext(wordsContext)


  return (
    <>
      <Container fluid className='bg-light' style={{height:"100vh"}}>
        <Row>
          <Col lg="9">
            <h1 className='mt-2 text-center'>Add New Data</h1>

            <FloatingLabel label="First Value" className="my-3">
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} type="text" id='firstValue' placeholder="Write your first value" />
            </FloatingLabel>

            <FloatingLabel label="Second Value" className="my-3">
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} type="text" id='secondValue' placeholder="Write your second value" />
            </FloatingLabel>

            <FloatingLabel label="Second Value" className="my-3">
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} type="text" id='thirdValue' placeholder="Write your third value" />
            </FloatingLabel>

            <FloatingLabel  label="Write your notes">
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} as="textarea" id='note' placeholder="Leave a comment here" style={{ height: '100px' }}/>
            </FloatingLabel>

            <div className='mt-4'>
              <Button variant="danger w-50">Cancel</Button>
              <Button onClick={handleNewWord} variant="primary w-50">Add</Button>
            </div><br />
            <hr />
            <h1 className='mt-2 text-center'>Recently Added</h1>
            <AddWordUnterList/>
          </Col>
          
          <Col style={{ padding: "-100px" }}>
            <AsideComponent/>
          </Col>

        </Row>

      </Container>

    </>
  )
}

export default AddWord