import Accordion from 'react-bootstrap/Accordion';
import { wordsContext } from "../../Context/wordsListContext.js";
import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Label, FloatingLabel, Form, Button } from 'react-bootstrap';
import { PencilSquare, Trash3Fill } from 'react-bootstrap-icons'

function TextStatistics() {


  const { getTextReviews, texts, newTextForAdmin, setNewTextForAdmin, handleNewAdminText, handleAdminTextCancel, handleAdminTextEdit, showUpdateText, setShowUpdateText, handleAdminTextDelete,handleAdminTextUpdate,showTextForm, setShowTextForm } = useContext(wordsContext)


  const handleShowForm = () => {
    setShowTextForm(!showTextForm);
  };

  useEffect(() => {
    console.log(texts[0])
    getTextReviews()
  }, [])


  return (
    <>
      <Row className='mt-5'>
        <Button variant='warning' className='py-4 mb-2 text-center' onClick={handleShowForm}>Click to Add New Text</Button>
        <Col className={`form-container ${showTextForm ? 'show' : ''}`}>
          <Form.Group>
            <Form.Label htmlFor="title" >Title</Form.Label>
            <Form.Control className='mb-3' onChange={(e) => setNewTextForAdmin({ ...newTextForAdmin, [e.target.id]: e.target.value })} as="textarea" id='title' value={newTextForAdmin.title} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="english" >English</Form.Label>
            <Form.Control className='mb-3' onChange={(e) => setNewTextForAdmin({ ...newTextForAdmin, [e.target.id]: e.target.value })} as="textarea" id='english' value={newTextForAdmin.english} style={{ height: '180px' }} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="german" >German</Form.Label>
            <Form.Control className='mb-3' onChange={(e) => setNewTextForAdmin({ ...newTextForAdmin, [e.target.id]: e.target.value })} as="textarea" id='german' value={newTextForAdmin.german} style={{ height: '180px' }} />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="turkish" >Turkish</Form.Label>
            <Form.Control className='mb-3' onChange={(e) => setNewTextForAdmin({ ...newTextForAdmin, [e.target.id]: e.target.value })} as="textarea" id='turkish' value={newTextForAdmin.turkish} style={{ height: '180px' }} />
          </Form.Group>

          <div className='mt-4'>
            <Row>
              <Col>
                <Button onClick={handleAdminTextCancel} variant="danger" className=' w-100'>Cancel</Button>
              </Col>
              <div style={{ width: '10px' }}></div> {/* Ara boşluk */}
              <Col>
                {showUpdateText ? <Button onClick={handleAdminTextUpdate} variant="warning" className='w-100'>Update</Button> : <Button onClick={handleNewAdminText} variant="primary w-100">Add</Button>}
              </Col>
            </Row>
          </div>
          <br />
          <hr />
        </Col>
      </Row>

      <Accordion className='mb-5' >
        {texts?.map((text, value) => (
          <Accordion.Item key={value} eventKey={value} >
            <Accordion.Header >
              <div className='me-1'>
              <Button onClick={() => handleAdminTextEdit(text[1])} variant="warning me-1" className='mb-1 py-1'><PencilSquare /></Button>
              <Button onClick={() => handleAdminTextDelete(text[1].id)} variant="danger" className='mb-1 py-1 me-2'><Trash3Fill /> </Button>
              </div>
              {text[1].title}
            </Accordion.Header>
            <Accordion.Body>
              {text[1].english}
            </Accordion.Body>
          </Accordion.Item>
        ))}

      </Accordion>
    </>
  );
}

export default TextStatistics;
