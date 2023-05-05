import { Container, Row, Col, Button, InputGroup, Form} from 'react-bootstrap';

const inputForm = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center'>Add Your Plans</h1>
                        <InputGroup>
                            <Form.Control
                                placeholder="Write your plans"
                                aria-label="Recipient's username with two button addons"
                            />
                            <Form.Control
                            type="date"
                            name="duedate"
                            placeholder="Due date"
                            />
                            <Form.Control
                            type="time"
                            name="duetime"
                            placeholder="Due time"
                            />
                            <Button variant="danger" className='mx-2'>Cancel</Button>
                            <Button variant="primary">Add</Button>
                        </InputGroup>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default inputForm
