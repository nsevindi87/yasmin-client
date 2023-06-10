import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext"
import { Toast, ToastContainer } from 'react-bootstrap';



function ContactForm() {
    const { contactInputValue, setContactInputValue, handleNewMail, handleContactCancel,showContactToast, setShowContactToast } = useContext(wordsContext)


    return (
        <Container>
            <Row>
                <Col>
                    <Form className='mt-3'>

                        <FloatingLabel label="Your Name">
                            <Form.Control type="text" onChange={(e) => setContactInputValue({ ...contactInputValue, [e.target.id]: e.target.value })} id='name' value={contactInputValue.name} />
                        </FloatingLabel>

                        <FloatingLabel className='my-3' label="Your Email">
                            <Form.Control type="text" onChange={(e) => setContactInputValue({ ...contactInputValue, [e.target.id]: e.target.value })} id='email' value={contactInputValue.email} />
                        </FloatingLabel>

                        <FloatingLabel label="Your Message">
                            <Form.Control type="textarea" onChange={(e) => setContactInputValue({ ...contactInputValue, [e.target.id]: e.target.value })} id='message' value={contactInputValue.message} />
                        </FloatingLabel>

                        {/* <Form.Group controlId="formFile" className="my-3">
                            <Form.Control type="file" />
                        </Form.Group>
 */}
                        <div className='mt-4'>
                            <Row>
                                <Col>
                                    <Button onClick={handleContactCancel} variant="danger" className='w-100 mb-5'>Cancel</Button>
                                </Col>
                                <div style={{ width: '10px' }}></div> {/* Ara boşluk */}
                                <Col>
                                    <Button onClick={handleNewMail} variant="primary" className='w-100 mb-5'>Send</Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Col>
            </Row>
            <ToastContainer className="p-3 " position="bottom-start">
                <Toast show={showContactToast} onClose={() => setShowContactToast(false)} delay={4000} autohide >
                    <Toast.Body style={{ background: 'green', color: 'white' }}>Your message has been sent!</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}

export default ContactForm;
