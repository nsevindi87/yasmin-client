import React,{useState} from 'react'
import WeatherCard from './WeatherCard';
import CurrencyCard from './CurrencyCard';
import WordsCardsAside from './WordsCardsAside';
import Form from 'react-bootstrap/Form'

const AsideComponent = () => {
  const [weatherVisible, setWeatherVisible] = useState(true);
  const [exerciseVisible, setExerciseVisible] = useState(true);
  const [currencyVisible, setCurrencyVisible] = useState(true);

  const handleWeatherChange = () => {
    setWeatherVisible(!weatherVisible);
  };

  const handleExerciseChange = () => {
    setExerciseVisible(!exerciseVisible);
  };

  const handleCurrencyChange = () => {
    setCurrencyVisible(!currencyVisible);
  };


  return (
    <div>

       {/* //!checked false oldugunda ekran görünürlügü gidecek! */}
      <Form>
        <div className="d-flex">
          <Form.Check
            type="switch"
            checked={weatherVisible}
            onChange={handleWeatherChange}
            label="Weather"
          />
          <Form.Check
            type="switch"
            checked={exerciseVisible}
            onChange={handleExerciseChange}
            label="Exercise"
            className='mx-2'
          />
          <Form.Check
            type="switch"
            checked={currencyVisible}
            onChange={handleCurrencyChange}
            label="Currency"
          />
        </div>
      </Form>
      {weatherVisible && <WeatherCard />}
      {exerciseVisible &&  <WordsCardsAside />}
      {currencyVisible && <CurrencyCard />}
      
     
      
    </div>
  )
}

export default AsideComponent
