import React, { useContext, useEffect, useState } from 'react';
import { wordsContext } from "../../Context/wordsListContext";
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Modal, Form, FloatingLabel,Nav } from 'react-bootstrap';


const PersonalText = () => {
  const { handleTextEdit, textModalShow, setTextModalShow, handleTextDelete, handleTextClose, handleTextUpdate, personalText, setTextNewInputValue, textNewInputValue } = useContext(wordsContext)

  const [showGermanMeaning, setShowGermanMeaning] = useState(false);
  const [showTurkishMeaning, setShowTurkishMeaning] = useState(false);

  const handleGermanMeaningClick = () => {
    setShowGermanMeaning(!showGermanMeaning);
  };

  const handleTurkishMeaningClick = () => {
    setShowTurkishMeaning(!showTurkishMeaning);
  };

  

  useEffect(() => {
    console.log(personalText)
  }, [])

  return (
    <div>
      <div className='text-center mt-5'>

        <Button className='btn-dark text-warning shadow ms-4' onClick={handleGermanMeaningClick}>
          {showGermanMeaning ? 'Hide German Meaning' : 'Show German Meaning'}
        </Button>
        <Button className='btn-dark text-warning shadow ms-4' onClick={handleTurkishMeaningClick}>
          {showTurkishMeaning ? 'Hide Turkish Meaning' : 'Show Turkish Meaning'}
        </Button>
        <div className='mt-3'>

        <Button onClick={() => handleTextEdit(personalText)} variant="warning me-4" className='p-2'>Edit Your Text</Button>
        <Button onClick={() => handleTextDelete(personalText?.id)} variant="danger" className='p-2'>Delete Your Text</Button>
        </div>


        <>
          <Modal show={textModalShow} onHide={handleTextClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Update Word</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FloatingLabel label="Title">
                  <Form.Control onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='title' value={textNewInputValue?.title} />
                </FloatingLabel>

                <FloatingLabel label="English">
                  <Form.Control className='mt-4' onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='english' value={textNewInputValue.english} style={{ height: '150px' }}/>
                </FloatingLabel>

                <FloatingLabel className='my-4' label="German" >
                  <Form.Control onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='german' value={textNewInputValue.german} style={{ height: '150px' }}/>
                </FloatingLabel>

                <FloatingLabel label="Turkish">
                  <Form.Control onChange={(e) => setTextNewInputValue({ ...textNewInputValue, [e.target.id]: e.target.value })} as="textarea" id='turkish' value={textNewInputValue.turkish} style={{ height: '150px' }} />
                </FloatingLabel>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleTextClose}>
                Close
              </Button>
              <Button variant="primary"  onClick={() => handleTextUpdate()} >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
      <div>
        <h1>{personalText?.title}</h1>
        <p className='m-4'>{personalText?.english?.split(". ").map((ex)=>
        <p>{ex}.</p>
        )}</p>
        {showGermanMeaning && <p className='m-4'><span style={{ fontWeight: 'bold' }}>German Meaning : </span>{personalText?.german}</p>}
        {showTurkishMeaning && <p className='m-4'><span style={{ fontWeight: 'bold' }}>Turkish Meaning : </span>{personalText?.turkish?.split(". ").map((ex)=>
        <p>{ex}.</p>
        )}</p>}
      </div>
    </div>
  )
}

export default PersonalText