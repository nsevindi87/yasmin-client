import React, { useContext, useEffect, useState } from 'react';
import { wordsContext } from "../../Context/wordsListContext";
import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';



const PersonalText = () => {
  const { getTextsListByUserId, getpersonalTextById, personalText, setPersonalText, personalTexts, setPersonalTexts } = useContext(wordsContext)

  const [showGermanMeaning, setShowGermanMeaning] = useState(false);
  const [showTurkishMeaning, setShowTurkishMeaning] = useState(false);

  const handleGermanMeaningClick = () => {
    setShowGermanMeaning(!showGermanMeaning);
  };

  const handleTurkishMeaningClick = () => {
    setShowTurkishMeaning(!showTurkishMeaning);
  };

  useEffect(() => {
    console.log(personalText)
  }, [])

  return (
    <div>
      <div className='text-center mt-5'>

        <Button className='btn-dark text-warning shadow ms-4' onClick={handleGermanMeaningClick}>
          {showGermanMeaning ? 'Hide German Meaning' : 'Show German Meaning'}
        </Button>
        <Button className='btn-dark text-warning shadow ms-4' onClick={handleTurkishMeaningClick}>
          {showTurkishMeaning ? 'Hide Turkish Meaning' : 'Show Turkish Meaning'}
        </Button>
      </div>
      <div>
        <h1>{personalText?.title}</h1>
        <p className='m-4'>{personalText?.english}</p>
        {showGermanMeaning && <p className='m-4'><span style={{ fontWeight: 'bold' }}>German Meaning : </span>{personalText?.german}</p>}
        {showTurkishMeaning && <p className='m-4'><span style={{ fontWeight: 'bold' }}>Turkish Meaning : </span>{personalText?.turkish}</p>}
      </div>
    </div>
  )
}

export default PersonalText