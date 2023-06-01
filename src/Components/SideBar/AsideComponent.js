import React,{useState} from 'react'
import WordsCardsAside from './WordsCardsAside';
import Form from 'react-bootstrap/Form'
import TodoAside from './TodoAside.js';

const AsideComponent = () => {
  const [exerciseVisible, setExerciseVisible] = useState(true);

  const handleExerciseChange = () => {
    setExerciseVisible(!exerciseVisible);
  };

  


  return (
    <div>

       {/* //!checked false oldugunda ekran görünürlügü gidecek! */}
      <Form>
        <div className="d-flex">
          
          <Form.Check
            type="switch"
            checked={exerciseVisible}
            onChange={handleExerciseChange}
            label="Exercise"
            className='mx-2'
          />
         
        </div>
      </Form>
      <TodoAside/>
      {exerciseVisible &&  <WordsCardsAside />}
      
     
      
    </div>
  )
}

export default AsideComponent
