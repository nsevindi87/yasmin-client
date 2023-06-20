import React, { useContext, useEffect } from 'react';
import { wordsContext } from "../../Context/wordsListContext.js";
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import image from "../../Images/selectLang1.png"


const EnglishTexts = () => {
  const { getTextReviews, texts, getTextById, text } = useContext(wordsContext)

  return (
    <div className='text-center'>
      <h1 className='shadow my-4'>List of English Texts</h1>
      {texts?.map((text, value) => (
        <Button className='btn-dark text-warning shadow ms-4' key={value}>
          <Nav.Link as={NavLink} onClick={() => getTextById(text[1].id)} to={`/textreview/english/${text[1].id}`} className='btn-dark text-warning shadow'>English Texts {value + 1}</Nav.Link>
        </Button>

      ))}
      <div className='d-flex justify-content-center align-item-center'>
        <div className="col-6" style={{ paddingTop: "5rem", paddingLeft: "1rem" }}>
          <img src={image} class="img-fluid" alt="Image" style={{ width: "100rem" }} />
        </div>
      </div>
    </div>
  )
}

export default EnglishTexts