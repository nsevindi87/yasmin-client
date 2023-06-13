import { useEffect, useContext, useState } from 'react';
import image from "../../Images/contentImg.png"
import image2 from "../../Images/contentImg2.png"
import user1 from "../../Images/contentImg.png"
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Nav, Card, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { wordsContext } from "../../Context/wordsListContext.js";
import { UserContext } from '../../Context/UserContext.js';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import MotivationSentences from "./MotivationSentences.js"


const Home = () => {
  const { getWordsList, getAsideWordList } = useContext(wordsContext)
  const { profileInfo, getProfileInfo } = useContext(UserContext)
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const renderText = () => {
    if (isHovered) {
      return "Die Zukunft hängt davon ab, was du heute tust.";
    } else {
      return "The future depends on what you do today.";
    }
  };

  useEffect(() => {
    getProfileInfo()
    getWordsList(profileInfo?.id)
    getAsideWordList(profileInfo?.id)
  }, [isAuthenticated])




  return (
    <div className='position-relative'>
      {/* Main Section */}
      <div className='mainpage text-center ' >
        <div className=" d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 >Y A S M I N </h1>
          <h1 style={{ fontSize: "60px" }}>Learning Platform </h1>
          <p className='m-0' style={{ fontSize: "20px" }}>“Give me six hours to chop down a tree and I will spend the first four sharpening the axe.”</p>
          <p className='text-secondary ' style={{ fontStyle: 'italic' }}>— Abraham Lincoln — </p>
          {!isAuthenticated ? <Button className='btn btn-outline-dark py-3 bg-warning mainbutton' style={{ border: 'none', padding: "60px" }}><Nav.Link to="logout" onClick={() => loginWithRedirect()}>Let's Startt</Nav.Link></Button> : <Button className='btn btn-outline-dark px-5 py-2 bg-warning mainbutton'><Nav.Link as={NavLink} to="/addword" >Let's Start</Nav.Link></Button>}
        </div>
      </div>

      {/* 3 Cards */}
      <div className='position-relative text-center' style={{ top: "-90px" }}>
        <h1 className='text-center offer m-0'>WHAT WE OFFER</h1>
        <div className='d-flex justify-content-center m-0 '>
          <Card style={{ width: '18rem' }} className='m-3 aboutcards'>
            <Card.Img variant='top' src={image} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>Create Your Archive</Card.Title>
              <Card.Text>
                Card 1 Açıklama
              </Card.Text>
              <Button variant='primary'>Detaylar</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className='m-3 aboutcards'>
            <Card.Img variant='top' src={image2} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>List Data</Card.Title>
              <Card.Text>
                Card 2 Açıklama
              </Card.Text>
              <Button variant='primary' >Detaylar</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className='m-3 aboutcards'>
            <Card.Img variant='top' src={image} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>Concentrate on Lists</Card.Title>
              <Card.Text>
                Card 3 Açıklama
              </Card.Text>
              <Button variant='primary'>Detaylar</Button>
            </Card.Body>
          </Card>
        </div>
      </div>


      {/* Services */}
      <div className='services'>
        <Row className='servicesContent mb-lg-3'>
          <h1 className='text-center py-2 mb-1 mb-3 offer'>SERVICES</h1>
          <Col className='pt-4 px-4 mx-5 mb-3 rounded servicecard'>
            <div className='d-flex'>
              <div>
                <img src={user1} style={{ width: "400px", marginRight: "150px", marginLeft: "100px" }} />
              </div>
              <div >
                <h3>Practice Makes Perfect: Enhance Your Skills</h3>
                <p className='pt-3'>In this section, you will have the opportunity to apply the knowledge you have gained. Through various activities, questions, and sample exercises, you can test, strengthen, and reinforce your skills. You will be able to practice at your own pace, making your learning process even more effective.</p>
               {/*  {!isAuthenticated ? <Button className='btn btn-outline-dark py-3 bg-warning mainbutton' style={{ border: 'none', padding: "60px" }}><Nav.Link to="logout" onClick={() => loginWithRedirect()}>Let's Startt</Nav.Link></Button> : <Button className='btn btn-outline-dark px-5 py-2 bg-warning mainbutton'><Nav.Link as={NavLink} to="/addword" >Let's Start</Nav.Link></Button>} */}
                <Button className='btn btn-outline-dark py-3 bg-warning mainbutton w-100' style={{ border: 'none', padding: "60px" }}><Nav.Link to="logout" onClick={() => loginWithRedirect()}>Now Make Practice <FaArrowRight /></Nav.Link></Button>
              </div>
            </div>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col className='pt-4 px-4 mx-5 my-3 rounded servicecard'>
            <div className='d-flex'>
              <div >
                <h3>Take Quiz: Test Your Knowledge</h3>
                <p className='pt-3'>Challenge yourself with our interactive quizzes covering various subjects. Each quiz consists of a set of randomly generated questions that will put your knowledge to the test. Your quiz results will be recorded, allowing you to track your progress and identify areas for improvement.</p>
                <Button className='btn btn-outline-dark py-3 bg-warning mainbutton w-100' style={{ border: 'none', padding: "60px" }}><Nav.Link to="logout" onClick={() => loginWithRedirect()}>Now Take Quiz <FaArrowRight /></Nav.Link></Button>
              </div>
              <div>
                <img src={user1} style={{ width: "400px", marginRight: "150px", marginLeft: "100px" }} />
              </div>
            </div>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col className='pt-4 px-4 mx-5 my-3 rounded servicecard'>
            <div className='d-flex'>
              <div>
                <img src={user1} style={{ width: "400px", marginRight: "150px", marginLeft: "100px" }} />
              </div>
              <div >
                <h3>Text Review: Sharpen Your Language Understanding</h3>
                <p className='pt-3'>Unlock the power of Text Review to expand your understanding and knowledge. Dive deep into texts, explore new concepts, and strengthen your grasp on various subjects. Elevate your learning experience and broaden your horizons with Text Review.</p>
                <Button className='btn btn-outline-dark py-3 bg-warning mainbutton w-100' style={{ border: 'none', padding: "60px" }}><Nav.Link to="logout" onClick={() => loginWithRedirect()}>Now Review Text <FaArrowRight /></Nav.Link></Button>
              </div>
            </div>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col className='pt-4 px-4 mx-5 my-3 rounded servicecard'>
            <div className='d-flex'>
              <div >
                <h3>Harness the Power of Example Sentences</h3>
                <p className='pt-3'>Example sentences are an essential resource for language learners. They provide practical and contextual usage of words and phrases, allowing you to grasp their meaning and usage in real-life scenarios. By incorporating example sentences into your study routine, you can improve your vocabulary, grammar, and overall language comprehension.</p>
                <Button className='btn btn-outline-dark py-3 bg-warning mainbutton w-100' style={{ border: 'none', padding: "60px" }}><Nav.Link to="logout" onClick={() => loginWithRedirect()}>Now Find Example Sentences <FaArrowRight /></Nav.Link></Button>
              </div>
              <div>
                <img src={user1} style={{ width: "400px", marginRight: "150px", marginLeft: "100px" }} />
              </div>
            </div>
          </Col>
        </Row>
        <hr></hr>
      </div>

      {/* User Experiences */}
      <div >
        <Row className='px-3 mx-5 my-3'>
          <h1 className='text-center py-2 my-3 offer'>USER EXPERIENCES</h1>
          <Col lg="5" className='p-4 rounded usercard'>
            <div className='d-flex'>
              <div className='w-25'>
                <img src={user1} style={{ width: "100px" }} />
              </div>
              <div >

                <p>" The text analysis feature allows me to deepen my understanding and improve my skills. The statistics on my profile give me overview of my progress. Highly recommended for self-motivated learners!"</p>
                <div>
                  <blockquote className='quote m-0'>Sofia Fischer</blockquote>
                  <div className="stars text-warning">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="2"></Col>
          <Col lg="5" className='p-4 rounded usercard' >
            <div className='d-flex'>
              <div className='w-25'>
                <img src={user1} style={{ width: "100px" }} />
              </div>
              <div >

                <p>"I'm impressed with this platform's features!  The text analysis tool provides valuable insights and helps me enhance my reading and comprehension skills. It's a fantastic platform for self-driven learners!"</p>
                <div >
                  <blockquote className='quote m-0'>Lukas Müller</blockquote>
                  <div className="stars text-warning">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* MOTIVATION  */}
      <div className='motivation'>
      <MotivationSentences initialText="Success is not final, failure is not fatal: It is the courage to continue that counts." hoverText="Der Erfolg ist nicht endgültig, der Misserfolg ist nicht tödlich: Es ist der Mut, weiterzumachen, der zählt."  citation="Winston Churchill"/>
      <MotivationSentences initialText="The only way to do great work is to love what you do." hoverText="Der einzige Weg, grossartige Arbeit zu leisten, ist es, das zu lieben, was du tust." citation="Steve Jobs"/>
      <MotivationSentences initialText="The only limit to our realization of tomorrow will be our doubts of today." hoverText="Die einzige Grenze für unsere Verwirklichung von morgen wird der Zweifel von heute sein." citation="Franklin D. Roosevelt"/>
      </div>

      {/* ANY QUESTION */}
      <div className='bg-warning mt-0 py-5 text-center'>
        <h2 >HAVE ANY QUESTIONS?</h2>
        <p>Feel free to reach out to us if you have any inquiries or need further assistance. We are here to help!</p>
        <Button className='btn btn-outline-dark py-3 bg-warning mainbutton w-25' style={{ padding: "60px" }}><Nav.Link as={NavLink} to="/contact" >Contact Us </Nav.Link></Button>
      </div>
    </div>
  )
}

export default Home