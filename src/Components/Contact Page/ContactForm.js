import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col,FloatingLabel } from 'react-bootstrap';


function ContactForm() {
    return (
        <Container>
            <Row>
                <Col>
                    <Form className='mt-3'>
                   
                        <FloatingLabel label="Your Name">
                            <Form.Control type="text"/>
                        </FloatingLabel>
                        <FloatingLabel className='my-3' label="Your Email">
                            <Form.Control type="email"/>
                        </FloatingLabel>
                        <FloatingLabel label="Your Message">
                            <Form.Control type="textarea"/>
                        </FloatingLabel>
                        <Form.Group controlId="formFile" className="my-3">
                            <Form.Control type="file" />
                        </Form.Group>

                        <Button variant="danger" type="submit" className='w-50 mb-5'>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className='w-50 mb-5'>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactForm;
