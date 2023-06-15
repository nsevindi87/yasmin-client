import React, { useContext, useEffect } from 'react';
import { wordsContext } from "../../Context/wordsListContext.js";
import { Button, Nav } from 'react-bootstrap';
import {  NavLink } from 'react-router-dom';


const TurkishTexts = () => {
  const { texts, getTextById, text } = useContext(wordsContext)



  return (
    <div className='text-center'>
      <h1>Türkçe Metinlerin Listesi</h1>
      {texts?.map((text, value) => (
        <Button className='btn-dark text-warning shadow ms-4' key={value}>
          <Nav.Link as={NavLink} onClick={() => getTextById(text[1].id)} to={`/textreview/turkish/${text[1].id}`} className='btn-dark text-warning shadow'>Türkçe Metin {value + 1}</Nav.Link>
        </Button>

      ))}
    </div>
  )
}

export default TurkishTexts