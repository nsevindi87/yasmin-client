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

  const accordionHeader = {
    backgroundColor: 'red',
    transition: 'width 1s linear',
    margin: `auto`
  };


  return (
    <Accordion>
      <Card>
        <Accordion.Header className='accordionHeader'>{greenWord[1]?.word}</Accordion.Header>
        <Accordion.Body>{greenWord[1]?.wordMeaning}</Accordion.Body>
        <Accordion.Body>{greenWord[1]?.wordSecondMeaning}</Accordion.Body>
      </Card>
      <Accordion.Item eventKey="1" className='mt-2'>
        <Accordion.Header>{yellowWord[1]?.word}</Accordion.Header>
        <Accordion.Body>{yellowWord[1]?.wordMeaning}</Accordion.Body>
        <Accordion.Body>{yellowWord[1]?.wordSecondMeaning}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className='mt-2'>
        <Accordion.Header>{redWord[1]?.word}</Accordion.Header>
        <Accordion.Body>{redWord[1]?.wordMeaning}</Accordion.Body>
        <Accordion.Body>{redWord[1]?.wordSecondMeaning}</Accordion.Body>
      </Accordion.Item>
    </Accordion>

  );
}

export default CardsAside;