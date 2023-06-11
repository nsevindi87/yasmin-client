import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Text = () => {
  const [showTranslation, setShowTranslation] = useState(false);

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const metin = `John is a 28-year-old software engineer who lives in a small town. He enjoys playing guitar in his free time and has a passion for photography. Last summer, he traveled to Germany for a language exchange program. He stayed with a German host family and attended language classes to improve his German skills.
  
During his stay, John explored the beautiful cities of Berlin and Munich. He visited famous landmarks such as the Brandenburg Gate and the Neuschwanstein Castle. He also indulged in traditional German cuisine, trying sausages, pretzels, and sauerkraut.
  
John made many new friends during his language exchange program, and he had the opportunity to practice speaking German with native speakers. He found it challenging at times, but his efforts paid off as he gradually became more confident in his language abilities.
  
Overall, John's experience in Germany was enriching and gave him a deeper appreciation for the German culture and language.`;

  const metin2 = `John ist ein 28-jähriger Softwareingenieur, der in einer kleinen Stadt lebt. In seiner Freizeit spielt er gerne Gitarre und hat eine Leidenschaft für Fotografie. Letzten Sommer reiste er für ein Sprachaustauschprogramm nach Deutschland. Er wohnte bei einer deutschen Gastfamilie und nahm an Sprachkursen teil, um seine Deutschkenntnisse zu verbessern.
  
Während seines Aufenthalts erkundete John die wunderschönen Städte Berlin und München. Er besuchte berühmte Sehenswürdigkeiten wie das Brandenburger Tor und das Schloss Neuschwanstein. Er probierte auch die traditionelle deutsche Küche mit Würstchen, Brezeln und Sauerkraut.
  
John knüpfte während seines Sprachaustauschprogramms viele neue Freundschaften und hatte die Möglichkeit, Deutsch mit Muttersprachlern zu üben. Manchmal fand er es herausfordernd, aber seine Bemühungen zahlten sich aus, da er nach und nach mehr Selbstvertrauen in seine Sprachfähigkeiten gewann.
  
Insgesamt war Johns Erfahrung in Deutschland bereichernd und vermittelte ihm eine tiefere Wertschätzung für die deutsche Kultur und Sprache.`;

  const cumleler = metin.split('. ').map((cumle) => cumle.trim());
  const cumleler2 = metin2.split('. ').map((cumle) => cumle.trim());

  return (
    <div>
        <h1 className='text-center shadow my-3'>Life of John</h1>
      {cumleler.map((cumle, index) => (
        <OverlayTrigger
          key={index}
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-bottom-${index}`}>
              <div style={{
              position: 'absolute',
              left:"-500px",
              margin:"4px",
              width:"500px",
              backgroundColor: 'red',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3
            }}>{cumleler2[index]}</div>
            </Tooltip>
          }
        >
          <p className='ms-5'>{cumle}</p>
        </OverlayTrigger>
      ))}
    </div>
  );
};

export default Text;
