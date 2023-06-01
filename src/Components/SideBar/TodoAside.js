import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext";
import { CheckCircle, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';


function TodoAside() {
  const { todoList, getTodoList, handleNewTodo } = useContext(wordsContext)

  return (
    <div>
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
            <Card.Title>Task:{task[1]?.task} </Card.Title>
            <Card.Text >Time: {task[1]?.time.slice(0, 5)}</Card.Text>
            <Card.Text>Date: {task[1]?.date.slice(0, 10)}</Card.Text>
          </Card.Body>
          <Card.Footer >
            <Button className=' btn-warning w-25 ms-4'> <PencilSquare /> </Button>
            <Button className='mx-1 btn-success w-25'> <CheckCircle /> </Button>
            <Button className='btn-danger w-25'> <Trash3Fill /> </Button>
          </Card.Footer>
        </Card>

      ))}
    </div>
  );
}

export default TodoAside;