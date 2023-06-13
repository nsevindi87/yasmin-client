import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Photo from "../../Images/Foto.jpg"
import Signature from "../../Images/signature.png"



const About = () => {


  return (
    <div>
      <Container className='my-5'>
        <Row >
          <Col>
            <h1>Hi I'm <span className='text-warning'>Nizami SEVINDI</span></h1>

            <p>Hello! I am a Full Stack Web Developer with a strong command of various technologies and frameworks. With a solid foundation in <strong>HTML, CSS, and Bootstrap </strong>I create visually appealing and responsive web interfaces that deliver an excellent user experience. My proficiency in <strong>JavaScript</strong> allows me to bring interactivity and dynamic functionality to websites, ensuring seamless interactions and engaging user interfaces.</p><strong></strong>
            <p>
              As a skilled <strong>React developer</strong>, I have expertise in building single-page applications and reusable UI components, enhancing performance and scalability. On the server-side, I am well-versed in <strong>Node.js</strong> and <strong> Express.js</strong>, enabling me to develop robust and efficient back-end systems. I have experience working with databases, particularly <strong>MySQL</strong>, and I utilize <strong>Sequelize </strong>as an ORM for seamless data management.</p>
            <p>
              I am passionate about creating clean and maintainable code, following best practices and industry standards. With a strong problem-solving mindset and effective communication skills, I am dedicated to delivering high-quality web solutions that meet clients' requirements and exceed expectations.
            </p>
            <img src={Signature} class="img-fluid" alt="Image" style={{ width: "12rem", borderRadius: "50px" }} />
          </Col>
          <Col className='ms-5 '>
            <img src={Photo} class="img-fluid aboutPhoto" alt="Image" style={{ width: "23rem", borderRadius: "50px" }} />
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default About