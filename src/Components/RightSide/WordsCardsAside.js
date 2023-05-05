import Accordion from 'react-bootstrap/Accordion';

function CardsAside() {
  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0" className='mt-2'>
        <Accordion.Header>einfallen</Accordion.Header>
        <Accordion.Body>
          jemandem als Einfall, als Idee [plötzlich] in den Sinn kommen
        </Accordion.Body>
        <Accordion.Body>
         get an idea
        </Accordion.Body>
        <Accordion.Body>
         aklina fikir gelmek
        </Accordion.Body>
        <Accordion.Body>
         Notes: Ayrilabilen fiildir. 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>unterstützen</Accordion.Header>
        <Accordion.Body>
        Ihre Templates müssen dies allerdings unterstützen.
        </Accordion.Body>
        <Accordion.Body>
        But the templates of the project have to support this functionality.
        </Accordion.Body>
        <Accordion.Body>
         Desteklemek
        </Accordion.Body>
        <Accordion.Body>
         Notes: Isim: Die Unterstützung  
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header className='redList'>verzichten</Accordion.Header>
        <Accordion.Body>
        Trotzdem brauchen Sie auf Sicherheit und modernste Technik nicht verzichten.
        </Accordion.Body>
        <Accordion.Body>
        Nevertheless, there was no need to do without safety features and most modern technology.
        </Accordion.Body>
        <Accordion.Body>
         Vazgecmek
        </Accordion.Body>
        <Accordion.Body>
         Notes: auf ile birlikte kullanilir. 
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CardsAside;