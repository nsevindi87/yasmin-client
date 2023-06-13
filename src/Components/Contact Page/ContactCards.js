import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsTelegram, BsWhatsapp, BsFillTelephoneFill, BsSignal, BsMap } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 47.36667,
    lng: 8.55,
};


const ContactCards = () => {
    return (
        <div>
            <Container>
                <div >
                    <div className='d-flex justify-content-between mt-5'>
                        <Card style={{ width: '6.4rem', padding: "0" }}>
                            <Card.Body>
                                <BsWhatsapp style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="warning">Whatsapp</Button>
                        </Card>

                        <Card style={{ width: '6.4rem' }}>
                            <Card.Body>
                                <BsTelegram style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="warning">Telegram</Button>
                        </Card>

                        <Card style={{ width: '6.4rem' }}>
                            <Card.Body>
                                <BsSignal style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="warning">E-Mail</Button>
                        </Card>

                        <Card style={{ width: '6.4rem' }}>
                            <Card.Body>
                                <BsFillTelephoneFill style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="warning">Phone</Button>
                        </Card>

                        <Card style={{ width: '6.4rem' }}>
                            <Card.Body>
                                <MdEmail style={{ fontSize: "5rem" }} />
                            </Card.Body>
                            <Button variant="warning">Signal</Button>
                        </Card>
                    </div>
                </div>

                <div className='my-5' style={{ width: '100%', height: '400px' }}>
                    <LoadScript googleMapsApiKey="AIzaSyDu7T8HVZhir28dRK4d4lVhmOkW7O87a5Y">
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript>
                </div>

            </Container>
        </div>
    )
}

export default ContactCards