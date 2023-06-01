import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { wordsContext } from "../../Context/wordsListContext";
import { useEffect, useContext } from 'react';

function CardsAside() {
  const { getAsideWords, greenWord, yellowWord, redWord } = useContext(wordsContext)

  useEffect(() => {
    getAsideWords()
    const interval = setInterval(() => {
      getAsideWords()
    }, 15000);
    return () => clearInterval(interval);
  }, [])


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
          <Card.Title> {redWord[1]?.word} </Card.Title>
          <Card.Text> {redWord[1]?.wordMeaning}</Card.Text>
          <Card.Text> {redWord[1]?.wordSecondMeaning}</Card.Text>
          <Card.Text> {redWord[1]?.wordNote}</Card.Text>
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
          <Card.Title> {greenWord[1]?.word} </Card.Title>
          <Card.Text> {greenWord[1]?.wordMeaning}</Card.Text>
          <Card.Text> {greenWord[1]?.wordSecondMeaning}</Card.Text>
          <Card.Text> {greenWord[1]?.wordNote}</Card.Text>
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
          <Card.Title> {greenWord[1]?.word} </Card.Title>
          <Card.Text> {greenWord[1]?.wordMeaning}</Card.Text>
          <Card.Text> {greenWord[1]?.wordSecondMeaning}</Card.Text>
          <Card.Text> {greenWord[1]?.wordNote}</Card.Text>
        </Card.Body>
      </Card>
    </>

  );
}

export default CardsAside;