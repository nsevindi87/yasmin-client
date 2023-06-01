import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext"

const InputForm = () => {
    const { todoValue, setTodoValue, handleNewTodo,handleTodoCancel,showTodoUpdate, handleTodoUpdate } = useContext(wordsContext)
   
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center'>Add Your Plans</h1>
                        <FloatingLabel label="Task">
                            <Form.Control type="text" id='task' value={todoValue.task} onChange={(e) => setTodoValue({ ...todoValue, [e.target.id]: e.target.value })} />
                        </FloatingLabel>
                        <FloatingLabel label="Date">
                            <Form.Control className='my-3' type="date" id='date' value={todoValue.date} onChange={(e) => setTodoValue({ ...todoValue, date: e.target.value })} />
                        </FloatingLabel>
                        <FloatingLabel label="Time">
                            <Form.Control type="time" id='time' value={todoValue.time} onChange={(e) => setTodoValue({ ...todoValue, [e.target.id]: e.target.value })} />
                        </FloatingLabel>
                        <Button variant="danger" onClick={handleTodoCancel} className='my-3 w-50'>Cancel</Button>

                        {showTodoUpdate ? <Button variant="primary" onClick={handleTodoUpdate} className='w-50'>Update</Button> :<Button variant="primary" onClick={handleNewTodo} className='w-50'>Add Task</Button>}
                        
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default InputForm
