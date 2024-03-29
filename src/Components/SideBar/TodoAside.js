import React, { useContext,useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext";
import { Trash3Fill } from 'react-bootstrap-icons';
import { UserContext } from '../../Context/UserContext.js';


function TodoAside() {
  const { todoList, getTodoList,handleTodoDelete } = useContext(wordsContext)

  
  const {profileInfo,getProfileInfo} = useContext(UserContext)
 
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const profileData = await getProfileInfo();
        await getTodoList(profileData.id);
      } catch (error) {
        // Hata yönetimi
      }
    };
    fetchData();
  },[])

  return (
    <div className='mt-2'>
      {todoList.slice(0, 1)?.map((task, value) => (
        <Card
          bg="light"
          key="light"
          text="dark"
          style={{ width: '20rem' }}
          className="mb-2"
        >
          <Card.Header><h5 className='text-danger'>Your next plan! Don't forget!!!</h5></Card.Header>
          <Card.Body>
            <Card.Text> <p  className='text-light text-decoration-underline mb-0 bg-dark'>To do :</p><h4>{task?.task} </h4></Card.Text>
            <Card.Text><p  className='text-light text-decoration-underline mb-0 bg-dark'>Date:</p><h4>{new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(task?.date))}</h4> </Card.Text>
            <Card.Text > <p  className='text-light text-decoration-underline mb-0 bg-dark shadow'>Time :</p><h4>{task?.time.slice(0,5)} </h4></Card.Text>
          </Card.Body>
          <Card.Footer >
            <Button className='btn-danger w-100' onClick={() => handleTodoDelete(task.id)}> <Trash3Fill /> </Button>
          </Card.Footer>
        </Card>

      ))}
    </div>
  );
}

export default TodoAside;