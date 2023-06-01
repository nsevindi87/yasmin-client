import React, { useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { wordsContext } from "../../Context/wordsListContext"

function TodoAside() {
  const { todoList, getTodoList,handleNewTodo } = useContext(wordsContext)

  return (
    <div>
      {todoList.slice(0,1)?.map((task, value) => (
                                <Card
                                bg="light"
                                key="light"
                                text="dark"
                                style={{ width: '20rem' }}
                                className="mb-2"
                              >
                                <Card.Header>Your next plan!</Card.Header>
                                <Card.Body>
                                  <Card.Title>Task:{task[1]?.task} </Card.Title>
                                  <Card.Text >Time: {task[1]?.time.slice(0,5)}</Card.Text>
                                  <Card.Text>Date: {task[1]?.date.slice(0,10)}</Card.Text>
                                </Card.Body>
                              </Card>

                            ))}
    </div>
  );
}

export default TodoAside;