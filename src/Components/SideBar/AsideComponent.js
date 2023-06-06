import React,{useState} from 'react'
import WordsCardsAside from './WordsCardsAside';
import Form from 'react-bootstrap/Form'
import TodoAside from './TodoAside.js';
import { useEffect, useContext } from 'react';
import { wordsContext } from "../../Context/wordsListContext.js";
import { UserContext } from '../../Context/UserContext.js';

const AsideComponent = () => {
  const [exerciseVisible, setExerciseVisible] = useState(true);
  const [todoVisible, setTodoVisible] = useState(true);


  const { getAsideWordList } = useContext(wordsContext)
  const { getProfileInfo,profileInfo,user2} = useContext(UserContext)

  const handleExerciseChange = () => {
    setExerciseVisible(!exerciseVisible);
  };
  const handleTodoChange = () => {
    setTodoVisible(!todoVisible);
  };
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const profileData = await getProfileInfo();
        await getAsideWordList(profileData.id);
        console.log(profileData);
      } catch (error) {
        // Hata yönetimi
      }
    };
  
    fetchData();
  },[])
  
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
