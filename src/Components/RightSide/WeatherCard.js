import { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import image from "../../Images/contentImg.png"

function WeatherCard() {
  const[weather,setWeather] = useState()

  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=zurich&appid=869123b3c849a2a21c389a77bfac9e9e&units=metric"

  const getWeather = async () => {
    try {
      const response = await fetch(`${BASE_URL}`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setWeather(data)
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch posts")
    }
  };

  useEffect(()=>{
    getWeather()
  },[])

  return (
    <Card className="bg-dark text-white mt-1" >
      <Card.Img className='pb-0' src={image} style={{opacity:"20%"}} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>{weather?.name}</Card.Title>
        <Card.Title>Temparature: {weather?.main.temp}°C </Card.Title>
        <Card.Title>Min / Max Temp: {weather?.main.temp_min}°C / {weather?.main.temp_max}°C</Card.Title>
        <Card.Text>
        {weather?.weather[0].description}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default WeatherCard;