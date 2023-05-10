import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsTelegram, BsWhatsapp, BsFillTelephoneFill, BsSignal,BsMap } from "react-icons/bs";
import { MdEmail } from "react-icons/md";



const ContactCards = () => {
    return (
        <div>
            <Container>
                <Row className='d-flex mt-5'>
                    <Col>
                        <Card style={{ width: '6.4rem', padding:"0" }}>
                            <Card.Body>
                                <BsWhatsapp style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="primary">Whatsapp</Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '6.4rem' }}>
                            <Card.Body>
                                <BsTelegram style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="primary">Telegram</Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '6.4rem' }}>
                            <Card.Body>
                                <BsSignal style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="primary">E-Mail</Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '6.4rem' }}>
                            <Card.Body>
                                <BsFillTelephoneFill style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="primary">Phone</Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '6.4rem' }}>
                            <Card.Body>
                                <MdEmail style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="primary">Signal</Button>
                        </Card>
                    </Col>
                </Row>
                <Row className='d-flex mt-5'>
                    <Col>
                        <Card style={{ width: '6.4rem', padding:"0" }}>
                            <Card.Body>
                                <BsMap style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="primary">Whatsapp</Button>
                        </Card>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}

export default ContactCards