import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const MotivationSentences = ({ initialText, hoverText, citation }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const renderText = () => {
    return isHovered ? hoverText : initialText;
  };

  return (
    <Row className="mt-5 text-center p-5" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Col>
        <blockquote className="blockquote mb-0">
          <h3 className='mb-3'>{renderText()}</h3>
          <footer className="blockquote-footer">
            <cite title="Source Title">{citation}</cite>
          </footer>
        </blockquote>
      </Col>
    </Row>
  );
};

export default MotivationSentences;