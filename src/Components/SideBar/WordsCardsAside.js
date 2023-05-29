import Accordion from 'react-bootstrap/Accordion';
import { wordsContext } from "../../Context/wordsListContext";
import { useState, useEffect, useContext } from 'react';


//!CALISMIYOR
function CardsAside() {
  const { greenList, redList, yellowList,getWordsList, } = useContext(wordsContext)

  const [greenWord, setGreenWord] = useState(null)
  const [yellowWord, setYellowWord] = useState(null)
  const [redWord, setRedWord] = useState(null)

  const kelimeGetir = ()=>{
    const randomWord = greenList[Math.floor(Math.random() * greenList.length)];
      const randomWord2 = yellowList[Math.floor(Math.random() * yellowList.length)];
      const randomWord3 = redList[Math.floor(Math.random() * redList.length)];
      setGreenWord(randomWord)
      setYellowWord(randomWord2)
      setRedWord(randomWord3)
  }

  useEffect(() => {
    
    getWordsList()

    const interval = setInterval(() => {
      kelimeGetir()
    }, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, [])

  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0" className='mt-2'>
          <Accordion.Header>{greenWord?.word}</Accordion.Header>
          <Accordion.Body >
          {greenWord?.word}
          </Accordion.Body>
          <Accordion.Body>
          {greenWord?.word}
          </Accordion.Body>
          <Accordion.Body>
          {greenWord?.word}
          </Accordion.Body>
          <Accordion.Body>
          {greenWord?.word}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className='mt-2'>
          <Accordion.Header>{yellowWord?.word}</Accordion.Header>
          <Accordion.Body>
          {yellowWord?.word}
          </Accordion.Body>
          <Accordion.Body>
          {yellowWord?.word}
          </Accordion.Body>
          <Accordion.Body>
          {yellowWord?.word}
          </Accordion.Body>
          <Accordion.Body>
          {yellowWord?.word}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className='mt-2'>
          <Accordion.Header>{redWord?.word}</Accordion.Header>
          <Accordion.Body>
          {redWord?.word}
          </Accordion.Body>
          <Accordion.Body>
          {redWord?.word}
          </Accordion.Body>
          <Accordion.Body>
          {redWord?.word}
          </Accordion.Body>
          <Accordion.Body>
          {redWord?.word}
          </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  );
}

export default CardsAside;