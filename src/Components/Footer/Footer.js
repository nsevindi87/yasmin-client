import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram,FaNeos } from 'react-icons/fa';
import logo from "../../Images/logo-2.png"

const Footer = () => {
  return (
    <footer className='bg-dark text-light pt-4 mt-3'>
      <Container>
        <Row className='footer'>
          <Col className='mb-3'>
            <img src={logo} alt="logo" style={{width:"15rem",}}/>
          </Col>
          <Col className='mb-3' >
            {/* İkinci sütun */}
            <h5>Company</h5>
            <ul className='list-unstyled'>
              {/* Hızlı bağlantı linkleri buraya eklenebilir */}
              <li>
                <a  href='#'>Home</a>
              </li>
              <li>
                <a  href='#'>About</a>
              </li>
              <li>
                <a href='#'>Contact</a>
              </li>
              <li>
                <a href='#'>Partnership</a>
              </li>
              <li>
                <a href='#'>Privacy Policy</a>
              </li>
            </ul>
          </Col>
          <Col className='mb-3'>
            {/* Dördüncü sütun */}
            <h5>Connections</h5>
            <ul className='list-unstyled'>
              {/* Önemli linkler buraya eklenebilir */}
              <li>
                <a href='https://openai.com/blog/chatgpt'>ChatGPT</a>
              </li>
              <li>
                <a href='https://context.reverso.net/%C3%BCbersetzung/'>reverso</a>
              </li>
              <li>
                <a href='https://tureng.com/de/deutsch-englisch'>Tureng</a>
              </li>
              <li>
                <a href='https://hicoders.ch/en/'>Hicoders</a>
              </li>
              <li>
                <a href='https://nizamisevindi.ch/'>Portfolio</a>
              </li>
            </ul>
          </Col>
          <Col className='mb-3'>
            {/* Üçüncü sütun */}
            <h5>Social Media - Contact</h5>
            <ul className='list-unstyled d-flex'>
              {/* Sosyal medya linkleri buraya eklenebilir */}
              <li className='me-3'>
                <a href='https://www.facebook.com/'>
                  <FaFacebook />
                </a>
              </li>
              <li className='me-3'>
                <a href='https://twitter.com'>
                  <FaTwitter />
                </a>
              </li>
              <li className='me-3'>
                <a href='https://instagram.com'>
                  <FaInstagram />
                </a>
              </li>
              <li className=''>
                <a href='https://nizamisevindi.ch/'>
                  <FaNeos />
                </a>
              </li>
            </ul>
            <p>+41 77 999 88 44</p>
            <p>info@yasmin.ch</p>
            <p>Zurich / Switzerland</p>
          </Col>
          
        </Row>
        <Row>
          <Col>
            {/* Alt bölüm */}
            <p className='text-center m-0'>
            &#169; 2023 | by Nizami SEVINDI | All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
