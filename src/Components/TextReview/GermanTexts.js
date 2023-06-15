import React, { useContext, useEffect } from 'react';
import { wordsContext } from "../../Context/wordsListContext.js";
import { Button, Nav } from 'react-bootstrap';
import {  NavLink } from 'react-router-dom';


const GermanTexts = () => {
  const { getTextReviews, texts, getTextById, text } = useContext(wordsContext)

  useEffect(() => {
    console.log(texts)
    console.log(text)
  }, [])


  return (
    <div className='text-center'>
      <h1>List of German Texts</h1>
      {texts?.map((text, value) => (
        <Button className='btn-dark text-warning shadow ms-4' key={value}>
          <Nav.Link as={NavLink} onClick={() => getTextById(text[1].id)} to={`/textreview/german/${text[1].id}`} className='btn-dark text-warning shadow'>German Texts {value + 1}</Nav.Link>
        </Button>

      ))}
    </div>
  )
}

export default GermanTexts