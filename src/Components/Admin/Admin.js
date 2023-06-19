import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../../Context/UserContext.js';
import { wordsContext } from "../../Context/wordsListContext.js";
import { Container, Row, Nav, Col, Tab, Form } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, PieChart, Pie, Sector } from "recharts";
import UserStatistics from "./UserStatistics.js"
import WordsStatistics from './WordsStatistics';
import QuizQuestions from './QuizQuestions';
import ContactMails from './ContactMails';
import Versions from "./Versions.js"
import TextStatistics from './TextStatistics';

const Admin = () => {

  const { getAllUsers, profileInfo, getProfileInfo, allUsers, setAllUsers } = useContext(UserContext)
  const { getAllWords, allWordsList2,setAllWordsList2 } = useContext(wordsContext)
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userWordsNumbers, setUserWordsNumbers] = useState([]);


  


  return (
    <Container fluid  className='shadow' style={{ backgroundColor: '#ededed'  }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
        <Row >
          <Col sm={12} md={3} lg={3} style={{height:"100vh"  }}>
            <Nav variant="pills" className="flex-column admin-nav" style={{ position: 'sticky', top: 70}}>
              <Nav.Item  className='rounded my-2' >
                <Nav.Link eventKey="user">User Statistics</Nav.Link>
              </Nav.Item>
              <Nav.Item className='rounded'>
                <Nav.Link eventKey="words">Words Statistics</Nav.Link>
              </Nav.Item>
              <Nav.Item className='rounded my-2'>
                <Nav.Link eventKey="quiz">Quiz Questions</Nav.Link>
              </Nav.Item>
              <Nav.Item className='rounded'>
                <Nav.Link eventKey="mail">Contact Mails</Nav.Link>
              </Nav.Item>
              <Nav.Item className='rounded my-2'>
                <Nav.Link eventKey="texts">All Texts</Nav.Link>
              </Nav.Item>
              <Nav.Item className='rounded mb-5'>
                <Nav.Link eventKey="version">App Versions</Nav.Link>
              </Nav.Item>
              
            </Nav>
          </Col>
          <Col sm={12} md={9} lg={9}>
            <Tab.Content>
              <Tab.Pane eventKey="user"><UserStatistics /></Tab.Pane>
              <Tab.Pane eventKey="words"><WordsStatistics /> </Tab.Pane>
              <Tab.Pane eventKey="quiz"><QuizQuestions /></Tab.Pane>
              <Tab.Pane eventKey="quizquestions"><QuizQuestions /></Tab.Pane>{/* quiz soru ara bul */}
              <Tab.Pane eventKey="mail"><ContactMails/></Tab.Pane>
              <Tab.Pane eventKey="texts"><TextStatistics/></Tab.Pane>
              <Tab.Pane eventKey="version"><Versions/></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default Admin