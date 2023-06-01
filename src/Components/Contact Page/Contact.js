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
          <h1 className='text-center mt-5'>Contact Us</h1>
            <ContactForm />
            <ContactCards />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Contact