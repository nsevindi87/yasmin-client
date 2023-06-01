import React,{useState} from 'react'
import WordsCardsAside from './WordsCardsAside';
import Form from 'react-bootstrap/Form'
import TodoAside from './TodoAside.js';

const AsideComponent = () => {
  const [exerciseVisible, setExerciseVisible] = useState(true);
  const [todoVisible, setTodoVisible] = useState(true);

  const handleExerciseChange = () => {
    setExerciseVisible(!exerciseVisible);
  };
  const handleTodoChange = () => {
    setTodoVisible(!todoVisible);
  };
  
  return (
    <div>
      <Form>
        <div className="d-flex">
          
          <Form.Check
            type="switch"
            checked={exerciseVisible}
            onChange={handleExerciseChange}
            label="Exercise"
            className='mx-2'
          />
          <Form.Check
            type="switch"
            checked={todoVisible}
            onChange={handleTodoChange}
            label="ToDos"
            className='mx-2'
          />
        </div>
      </Form>
      {todoVisible &&  <TodoAside/>}
      {exerciseVisible &&  <WordsCardsAside />}  
    </div>
  )
}
export default AsideComponent
