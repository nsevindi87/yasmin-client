import React, { useState,useEffect,useContext } from 'react';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import {wordsContext} from "../../Context/wordsListContext"


const InputForm = () => {
    const {  todoValue, setTodoValue,todoList, setTodoList,handleNewTodo, handleCancelTodo   } = useContext(wordsContext)

   

  

    useEffect(()=>{

    },[todoList])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center'>Add Your Plans</h1>
                        <Form>
                            <Form.Group controlId="task">
                                <Form.Label>Task:</Form.Label>
                                <Form.Control type="text" id='task' value={todoValue.task} onChange={(e)=>setTodoValue({...todoValue, [e.target.id]:e.target.value})} />
                            </Form.Group>

                            <Form.Group controlId="date">
                                <Form.Label>Date:</Form.Label>
                                <Form.Control type="date" id='date' value={todoValue.date} onChange={(e)=>setTodoValue({...todoValue, [e.target.id]:e.target.value})}/>
                            </Form.Group>

                            <Form.Group controlId="time">
                                <Form.Label>Time:</Form.Label>
                                <Form.Control type="time" id='time' value={todoValue.time} onChange={(e)=>setTodoValue({...todoValue, [e.target.id]:e.target.value})} />
                            </Form.Group>
                            <Button variant="danger" className='my-3 w-50'>Cancel</Button>
                            <Button variant="primary" onClick={handleNewTodo} className='w-50'>Add Task</Button>
                        </Form>
                        <h2>Tasks:</h2>
                        <ListGroup>
                            {todoList.map((task, index) => (
                                <ListGroup.Item key={index}>
                                    {task.task} - {task.date} - {task.time}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default InputForm
