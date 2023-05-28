import React, { useContext, useEffect,useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, FloatingLabel,Nav } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext";
import {  Link } from 'react-router-dom';
import { PencilSquare, Trash3Fill  } from 'react-bootstrap-icons'




const GeneralList = () => {
  const { getWordsList, allWordsList, handleDelete, handleEdit, handleClose, show, setInputValue, inputValue, handleUpdate,
    wordList, setWordList,handleEditList,handleDeleteList,getQuizQuestions } = useContext(wordsContext)


  useEffect(() => {
    getWordsList()
  }, [allWordsList])

  return (
    <>
      <Container>
        <Row className='mt-5' >
          <Col >
            <h1 className='text-center'>All Word List</h1>
            <div className='mb-2 text-center'>
              <Button className='btn-dark text-warning mx-3'><Nav.Link as={Link} to="/practice">Training</Nav.Link></Button>
              <Button className='btn-dark text-warning'><Nav.Link as={Link} to="/quiz" onClick={getQuizQuestions}>Test Yourself</Nav.Link></Button>
            </div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr className='text-center'>
                  <th>#</th>
                  <th>Value 1</th>
                  <th>Value 2</th>
                  <th>Value 3</th>
                  <th>Notes</th>
                  <th>Actions </th>
                  <th>List </th>
                  <th >New List </th>
                </tr>
              </thead>
              <tbody>
                {allWordsList?.map((word, value) => (
                  <tr key={value} className='text-center'>
                    <td>{value + 1}</td>
                    <td>{word.word}</td>
                    <td>{word.wordMeaning}</td>
                    <td>{word.wordSecondMeaning}</td>
                    <td>{word.wordNote}</td>
                    <td>
                      <Button onClick={() => handleEdit(word)} variant="warning me-1" size='sm'><PencilSquare/></Button>
                      <Button onClick={() => handleDelete(word.id)} variant="danger" size='sm'><Trash3Fill/> </Button>
                    </td>
                    <td> {word.wordCategory ? <Button variant={word.wordCategory} onClick={()=> handleDeleteList(word.id)} className='p-2'></Button> : null}</td>
                    <td>
                      {word.wordCategory ? null :
                        <div>
                          <Button variant="success" onClick={() => handleEditList("success", word.id)} className='p-2'></Button>
                          <Button variant="warning" onClick={() => handleEditList("warning",word.id)} className='p-2 mx-1'></Button>
                          <Button variant="danger" onClick={() => handleEditList("danger",word.id)} className='p-2'></Button>
                        </div>
                      }
                    </td>
                  </tr>
                ))}
                <>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Word</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <FloatingLabel label="First Value">
                          <Form.Control onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: e.target.value })} type="text" id='word' value={inputValue.word} />
                        </FloatingLabel>

                        <FloatingLabel label="Second Value">
                          <Form.Control className='mt-4' onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: e.target.value })} type="text" id='wordMeaning' value={inputValue.wordMeaning} />
                        </FloatingLabel>

                        <FloatingLabel className='my-4' label="Third Value" >
                          <Form.Control onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: e.target.value })} type="text" id='wordSecondMeaning' value={inputValue.wordSecondMeaning} />
                        </FloatingLabel>

                        <FloatingLabel label="Notes">
                          <Form.Control onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: e.target.value })} as="textarea" id='wordNote' value={inputValue.wordNote} style={{ height: '100px' }} />
                        </FloatingLabel>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={()=>handleUpdate()}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>

              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default GeneralList