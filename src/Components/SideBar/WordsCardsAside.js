import Card from 'react-bootstrap/Card';
import { wordsContext } from "../../Context/wordsListContext";
import { useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext.js';
import { useAuth0 } from '@auth0/auth0-react';

function CardsAside() {
  const { getAsideWordList,greenAsideList,yellowAsideList,redAsideList } = useContext(wordsContext)
  const {profileInfo,getProfileInfo,user2} = useContext(UserContext)

  const randomRed = redAsideList[Math.floor(Math.random() * redAsideList.length)]
  const randomYellow = yellowAsideList[Math.floor(Math.random() * yellowAsideList.length)]
  const randomGreen = greenAsideList[Math.floor(Math.random() * greenAsideList.length)]
 
  const {isAuthenticated } = useAuth0();

  useEffect(() => {
  
    const interval = setInterval(() => {
      const fetchData = async () => {
          const profileData = await getProfileInfo();
          await getAsideWordList(profileData.id);
          console.log(profileData);
      };
      fetchData()
    }, 5000);
    return () => clearInterval(interval);

  }, [isAuthenticated])

  return (
    <>
      <Card
        bg="danger"
        key="danger"
        text="light"
        style={{ width: '20rem' }}
        className="mb-2"
      >
        <Card.Header>Red List</Card.Header>
          <Card.Body>
            <Card.Title> {randomRed?.word} </Card.Title>
            <Card.Text> {randomRed?.wordMeaning}</Card.Text>
            <Card.Text> {randomRed?.wordSecondMeaning}</Card.Text>
            <Card.Text> {randomRed?.wordNote}</Card.Text>
          </Card.Body>
      </Card>
      <Card
        bg="warning"
        key="warning"
        text="light"
        style={{ width: '20rem' }}
        className="mb-2"
      >
        <Card.Header>Yellow List</Card.Header>
        <Card.Body>
          <Card.Title> {randomYellow?.word} </Card.Title>
          <Card.Text> {randomYellow?.wordMeaning}</Card.Text>
          <Card.Text> {randomYellow?.wordSecondMeaning}</Card.Text>
          <Card.Text> {randomYellow?.wordNote}</Card.Text>
        </Card.Body>
      </Card>
      <Card
        bg="success"
        key="success"
        text="light"
        style={{ width: '20rem' }}
        className="mb-2"
      >
        <Card.Header>Green List</Card.Header>
        <Card.Body>
          <Card.Title> {randomGreen?.word} </Card.Title>
          <Card.Text> {randomGreen?.wordMeaning}</Card.Text>
          <Card.Text> {randomGreen?.wordSecondMeaning}</Card.Text>
          <Card.Text> {randomGreen?.wordNote}</Card.Text>
        </Card.Body>
      </Card>
    </>

  );
}

export default CardsAside;