import Accordion from 'react-bootstrap/Accordion';
import { wordsContext } from "../../Context/wordsListContext";
import { useState, useEffect, useContext } from 'react';

function CardsAside() {
  const { getAsideWords, greenWord, yellowWord, redWord } = useContext(wordsContext)

useEffect(()=>{
getAsideWords()
const interval = setInterval(() => {
  getAsideWords()
}, 15000);
return () => clearInterval(interval);
},[]) 

  return (
    <Accordion>
      <Accordion.Item eventKey="0" className='mt-2'>
        <Accordion.Header>{greenWord[1]?.word}</Accordion.Header>
        <Accordion.Body>{greenWord[1]?.wordMeaning}</Accordion.Body>
        <Accordion.Body>{greenWord[1]?.wordSecondMeaning}</Accordion.Body>
      </Accordion.Item>
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