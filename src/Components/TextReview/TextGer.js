import React, { useState, useContext, useEffect } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


import { wordsContext } from "../../Context/wordsListContext.js";

const Text = () => {
  const { getTextReviews, texts, getTextById, text } = useContext(wordsContext);

  const [showEnglishMeaning, setShowEnglishMeaning] = useState(false);
  const [showTurkishMeaning, setShowTurkishMeaning] = useState(false);

  const handleGermanMeaningClick = () => {
    setShowEnglishMeaning(!showEnglishMeaning);
  };

  const handleTurkishMeaningClick = () => {
    setShowTurkishMeaning(!showTurkishMeaning);
  };

  return (
    <div>
      <div className='text-center mt-5'>

      <Button className='btn-dark text-warning shadow ms-4' onClick={handleGermanMeaningClick}>
        {showEnglishMeaning ? 'Hide English Meaning' : 'Show English Meaning'}
      </Button>
      <Button className='btn-dark text-warning shadow ms-4' onClick={handleTurkishMeaningClick}>
        {showTurkishMeaning ? 'Hide Turkish Meaning' : 'Show Turkish Meaning'}
      </Button>
      </div>
      <div>
        <p className='m-4'>{text.german}</p>
        {showEnglishMeaning && <p className='m-4'><span style={{ fontWeight: 'bold' }}>English Meaning : </span>{text.english}</p>}
        {showTurkishMeaning && <p className='m-4'><span style={{ fontWeight: 'bold' }}>Turkish Meaning : </span>{text.turkish}</p>}
      </div>
      <Button className='btn-dark text-warning shadow ms-4'>
          <Nav.Link as={NavLink} to={`/textreview/german`} className='btn-dark text-warning shadow ms-4'>Turn Back</Nav.Link>
        </Button>
    </div>
  );
};

export default Text;
