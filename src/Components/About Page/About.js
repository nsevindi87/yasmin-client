import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Foto from "../../Images/Foto.jpg"

const About = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col style={{marginTop:"7rem"}}>
          <h1>Hi I'm <span>Nizami SEVINDI</span></h1>
          
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <h1>Imza</h1>
          </Col>
          <Col style={{marginTop:"7rem"}}>
          <img src={Foto} class="img-fluid" alt="Image" style={{width:"23rem", borderRadius:"50px"}}/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About