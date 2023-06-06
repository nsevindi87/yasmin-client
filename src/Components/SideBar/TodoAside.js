import React, { useContext,useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext";
import { Trash3Fill } from 'react-bootstrap-icons';


function TodoAside() {
  const { todoList, getTodoList,handleTodoDelete } = useContext(wordsContext)

  useEffect(()=>{
    getTodoList()
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
          <Card.Header>Your next plan! Don't forget!!!</Card.Header>
          <Card.Body>
            <Card.Text> <p  className='text-muted text-decoration-underline'>To do :</p><h4>{task[1]?.task} </h4></Card.Text>
            <Card.Text><p  className='text-muted text-decoration-underline'>Date:</p><h4>{task[1]?.date.slice(0,10)}</h4> </Card.Text>
            <Card.Text > <p  className='text-muted text-decoration-underline'>Time :</p><h4>{task[1]?.time.slice(0,5)} </h4></Card.Text>
          </Card.Body>
          <Card.Footer >
            <Button className='btn-danger w-100' onClick={() => handleTodoDelete(task[1].id)}> <Trash3Fill /> </Button>
          </Card.Footer>
        </Card>

      ))}
    </div>
  );
}

export default TodoAside;