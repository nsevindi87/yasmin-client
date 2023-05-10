import React from 'react'
import ContactCards from './ContactCards'
import ContactForm from './ContactForm'
import { Container, Row, Col } from 'react-bootstrap';



const Contact = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <ContactForm />
          </Col>
          <Col lg="6">
            <ContactCards />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Contact