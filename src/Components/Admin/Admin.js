import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../../Context/UserContext.js';
import { wordsContext } from "../../Context/wordsListContext.js";
import { Container, Row, Nav, Col, Tab, Form } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, PieChart, Pie, Sector } from "recharts";
import UserStatistics from "./UserStatistics.js"
import WordsStatistics from './WordsStatistics';
import TodoStatistics from './TodoStatistics';
import QuizStatistics from './QuizStatistics';
import QuizQuestions from './QuizQuestions';

const Admin = () => {

  const { getAllUsers, profileInfo, getProfileInfo, allUsers, setAllUsers } = useContext(UserContext)
  const { getAllWords, allWordsList2,setAllWordsList2 } = useContext(wordsContext)
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userWordsNumbers, setUserWordsNumbers] = useState([]);


  


  return (
    <Container fluid>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
        <Row >
          <Col sm={2} >
            <Nav variant="pills" className="flex-column" style={{ position: 'sticky', top: 50}}>
              <Nav.Item>
                <Nav.Link eventKey="user">User Statistics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="words">Words Statistics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="todo">Todo Statistics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="quiz">Quiz Statistics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="quizquestions">Quiz Questions</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="user"><UserStatistics /></Tab.Pane>
              <Tab.Pane eventKey="words"><WordsStatistics /> </Tab.Pane>
              <Tab.Pane eventKey="todo"><TodoStatistics /> </Tab.Pane>
              <Tab.Pane eventKey="quiz"><QuizStatistics /></Tab.Pane>
              <Tab.Pane eventKey="quizquestions"><QuizQuestions /></Tab.Pane>{/* quiz soru ekle cikar editle ara bul */}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default Admin