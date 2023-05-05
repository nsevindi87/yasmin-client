import Card from 'react-bootstrap/Card';
import image from "../../Images/contentImg.png"

function CurrencyCard() {
  return (
    <Card className="bg-dark text-white mt-1">
      <Card.Img className='pb-0' src={image} style={{opacity:"20%"}} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>Currency Rates and Converter</Card.Title>
        <Card.Text>1 CHF = 19.20 TR</Card.Text>
        <Card.Text>1 CHF = 0.92 EURO</Card.Text>
        <Card.Text>xx XXX = xx XXX</Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default CurrencyCard;