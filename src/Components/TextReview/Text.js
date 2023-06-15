import React, { useState, useContext, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { wordsContext } from "../../Context/wordsListContext.js";
import { useParams } from 'react-router-dom';

const Text = () => {
  const { getTextReviews, texts, getTextById, text } = useContext(wordsContext);

  return (
    <div>
      <h1 className='text-center shadow my-3'>Life of John</h1>
      <div>
        <p>{text.english}</p>
      </div>
    </div>
  );
};

export default Text;
