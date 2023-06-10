import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import {wordsContext} from "../../Context/wordsListContext"


function ContactForm() {
    const { contactInputValue, setContactInputValue,handleNewMail } = useContext(wordsContext)

    return (
        <Container>
            <Row>
                <Col>
                    <Form className='mt-3'>

                        <FloatingLabel label="Your Name">
                            <Form.Control type="text" onChange={(e)=>setContactInputValue({...contactInputValue, [e.target.id]:e.target.value})} id='name' value={contactInputValue.word} />
                        </FloatingLabel>

                        <FloatingLabel className='my-3' label="Your Email">
                            <Form.Control type="email" onChange={(e)=>setContactInputValue({...contactInputValue, [e.target.id]:e.target.value})} id='email' value={contactInputValue.word} />
                        </FloatingLabel>

                        <FloatingLabel label="Your Message">
                            <Form.Control type="textarea" onChange={(e)=>setContactInputValue({...contactInputValue, [e.target.id]:e.target.value})} id='message' value={contactInputValue.word} />
                        </FloatingLabel>

                        {/* <Form.Group controlId="formFile" className="my-3">
                            <Form.Control type="file" />
                        </Form.Group>
 */}
                        <div className='mt-4'>
                            <Row>
                                <Col>
                                <Button variant="danger" type="submit" className='w-100 mb-5'>Cancel</Button>
                                </Col>
                                <div style={{ width: '10px' }}></div> {/* Ara boşluk */}
                                <Col>
                                <Button onClick={handleNewMail} variant="primary" type="submit" className='w-100 mb-5'>Send</Button>
                                </Col>
                            </Row>
                        </div>
                      </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactForm;
