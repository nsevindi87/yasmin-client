import React, { useState, useContext, useEffect } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


import { wordsContext } from "../../Context/wordsListContext.js";

const Text = () => {
  const { getTextReviews, texts, getTextById, text } = useContext(wordsContext);

  const [showGermanMeaning, setShowGermanMeaning] = useState(false);
  const [showEnglishMeaning, setShowEnglishMeaning] = useState(false);

  const handleGermanMeaningClick = () => {
    setShowGermanMeaning(!showGermanMeaning);
  };

  const handleEnglishMeaningClick = () => {
    setShowEnglishMeaning(!showEnglishMeaning);
  };

  return (
    <div>
      <div className='text-center mt-5'>

      <Button className='btn-dark text-warning shadow ms-4' onClick={handleGermanMeaningClick}>
        {showGermanMeaning ? 'Hide German Meaning' : 'Show German Meaning'}
      </Button>
      <Button className='btn-dark text-warning shadow ms-4' onClick={handleEnglishMeaningClick}>
        {showEnglishMeaning ? 'Hide English Meaning' : 'Show English Meaning'}
      </Button>
      </div>
      <div>
        <p className='m-4'>{text.turkish}</p>
        {showGermanMeaning && <p className='m-4'><span style={{ fontWeight: 'bold' }}>German Meaning : </span>{text.german}</p>}
        {showEnglishMeaning && <p className='m-4'><span style={{ fontWeight: 'bold' }}>English Meaning : </span>{text.english}</p>}
      </div>
      <Button className='btn-dark text-warning shadow ms-4'>
          <Nav.Link as={NavLink} to={`/textreview/turkish`} className='btn-dark text-warning shadow ms-4'>Turn Back</Nav.Link>
        </Button>
    </div>
  );
};

export default Text;
