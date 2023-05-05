import React from 'react'
import WeatherCard from './WeatherCard';
import CurrencyCard from './CurrencyCard';
import WordsCardsAside from './WordsCardsAside';

const AsideComponent = () => {
  return (
    <div>
      <WeatherCard/>
      <WordsCardsAside/>
      <CurrencyCard/>
    </div>
  )
}

export default AsideComponent
