import React from 'react'
import WeatherCard from './WeatherCard';
import CurrencyCard from './CurrencyCard';
import WordsCardsAside from './WordsCardsAside';
import Form from 'react-bootstrap/Form'

const AsideComponent = () => {
  return (
    <div>

       {/* //!checked false oldugunda ekran görünürlügü gidecek! */}
      <Form>
        <div className="d-flex">
          <Form.Check
            type="switch"
            id="inline-radio-1"
            label="Weather"
          />
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Exercise"
            checked="true"
            className='mx-2'
          />
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Currency"
            checked="true"
          />
        </div>
      </Form>
      <WeatherCard />
      <WordsCardsAside />
      <CurrencyCard />
    </div>
  )
}

export default AsideComponent
