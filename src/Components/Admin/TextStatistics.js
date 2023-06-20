import Accordion from 'react-bootstrap/Accordion';
import { wordsContext } from "../../Context/wordsListContext.js";
import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function TextStatistics() {


  const { getTextReviews,texts } = useContext(wordsContext)
  const [showTextForm, setShowTextForm] = useState(false);

  const handleShowForm = () => {
    setShowTextForm(!showTextForm);
  };

  useEffect(() => {
    console.log(texts[0])
    getTextReviews()
  }, [])


  return (
    <>
      <Button variant='warning' className='py-4  mt-3 mb-2 text-center'  onClick={handleShowForm}>Click to Add New Text</Button>

      <Accordion >
        {texts?.map((text, value)=>(
        <Accordion.Item key={value} eventKey={value}>
          <Accordion.Header>{text[1].title}</Accordion.Header>
          <Accordion.Body>
            {text[1].english}
          </Accordion.Body>
        </Accordion.Item>
        ))}
        
      </Accordion>
    </>
  );
}

export default TextStatistics;
