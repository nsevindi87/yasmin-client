import { useEffect, useContext, useState } from 'react';
import image from "../../Images/contentImg.png"
import image2 from "../../Images/contentImg2.png"
import user1 from "../../Images/contentImg.png"
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Nav, Card, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { wordsContext } from "../../Context/wordsListContext.js";
import { UserContext } from '../../Context/UserContext.js';
import { FaStar } from 'react-icons/fa';


const Home = () => {
  const { getWordsList, getAsideWordList } = useContext(wordsContext)
  const { profileInfo, getProfileInfo } = useContext(UserContext)
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  useEffect(() => {
    getProfileInfo()
    getWordsList(profileInfo?.id)
    getAsideWordList(profileInfo?.id)
  }, [isAuthenticated])
  return (
    <div className='position-relative'>
      <div className='mainpage text-center ' >
        <div className=" d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 >Y A S M I N </h1>
          <h1 style={{ fontSize: "60px" }}>Learning Platform </h1>
          <p style={{ fontSize: "20px" }}>“Give me six hours to chop down a tree and I will spend the first four sharpening the axe.”
            — Abraham Lincoln</p>
          {!isAuthenticated ? <Button className='btn btn-outline-dark py-3 bg-warning mainbutton' style={{ border: 'none', padding: "60px" }}><Nav.Link to="logout" onClick={() => loginWithRedirect()}>Let's Startt</Nav.Link></Button> : <Button className='btn btn-outline-dark px-5 py-2 bg-warning mainbutton'><Nav.Link as={NavLink} to="/addword" >Let's Start</Nav.Link></Button>}
        </div>
      </div>
      <div className='position-relative text-center' style={{ top: "-90px" }}>
        <h1 className='text-center offer m-0'>WHAT WE OFFER</h1>
        <div className='d-flex justify-content-center m-0 '>
          <Card style={{ width: '18rem' }} className='m-3 aboutcards'>
            <Card.Img variant='top' src={image} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>Card 1 Başlık</Card.Title>
              <Card.Text>
                Card 1 Açıklama
              </Card.Text>
              <Button variant='primary'>Detaylar</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className='m-3 aboutcards'>
            <Card.Img variant='top' src={image2} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>Card 2 Başlık</Card.Title>
              <Card.Text>
                Card 2 Açıklama
              </Card.Text>
              <Button variant='primary' >Detaylar</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} className='m-3 aboutcards'>
            <Card.Img variant='top' src={image} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>Card 3 Başlık</Card.Title>
              <Card.Text>
                Card 3 Açıklama
              </Card.Text>
              <Button variant='primary'>Detaylar</Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div >
        <Row className='px-3 mx-5 my-3'>
          <h2 className='text-center py-2 mb-1 offer'>User Experiences</h2>
          <Col lg="5" className='pt-4 px-4 rounded usercard'>
            <div className='d-flex'>
              <div className='w-25'>
                <img src={user1} style={{ width: "100px" }} />
              </div>
              <div >

                <p>" The text analysis feature allows me to deepen my understanding and improve my skills. The statistics on my profile give me overview of my progress. Highly recommended for self-motivated learners!"</p>
                <div>
                  <blockquote className='quote m-0'>Sofia Fischer</blockquote> 
                  <div className="stars text-warning">
                    <FaStar/> <FaStar/> <FaStar/> <FaStar/> <FaStar/>
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
                    <FaStar/> <FaStar/> <FaStar/> <FaStar/> <FaStar/>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default Home