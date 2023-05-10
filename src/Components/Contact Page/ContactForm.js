import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';


function ContactForm() {
    return (
        <Container>
            <Row>
                <Col>
                    <Form className='mt-5'>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control type="email" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Your Email Adress</Form.Label>
                            <Form.Control type="password" placeholder="Enter Mail" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your Message</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter Message" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Your Datei</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>

                        <Button variant="danger" type="submit" className='w-50'>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className='w-50'>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactForm;
