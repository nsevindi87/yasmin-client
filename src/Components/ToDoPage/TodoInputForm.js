import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext"
import { UserContext } from '../../Context/UserContext.js';


const InputForm = () => {
    const { todoValue, setTodoValue, handleNewTodo, handleTodoCancel, showTodoUpdate, handleTodoUpdate } = useContext(wordsContext)

    const { getProfileInfo, profileInfo } = useContext(UserContext)

    useEffect(() => {
        getProfileInfo()
    }, [])
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center shadow mb-4'>Add Your Plans</h1>
                        <FloatingLabel label="Task">
                            <Form.Control type="text" id='task' value={todoValue.task} onChange={(e) => setTodoValue({ ...todoValue, [e.target.id]: e.target.value })} />
                        </FloatingLabel>
                        <FloatingLabel label="Date">
                            <Form.Control className='my-3' type="date" id='date' value={todoValue.date} onChange={(e) => setTodoValue({ ...todoValue, date: e.target.value })} />
                        </FloatingLabel>
                        <FloatingLabel label="Time">
                            <Form.Control type="time" id='time' value={todoValue.time} onChange={(e) => setTodoValue({ ...todoValue, [e.target.id]: e.target.value })} />
                        </FloatingLabel>
                        <Row className='mt-3'>
                            <Col>
                                <Button variant="danger" onClick={handleTodoCancel} className=' w-100'>Cancel</Button>
                            </Col>
                            <div style={{ width: '10px' }}></div> {/* Ara boşluk */}
                            <Col>
                                {showTodoUpdate ? <Button variant="warning" onClick={handleTodoUpdate} className='w-100'>Update</Button> : <Button variant="primary" onClick={handleNewTodo} className='w-100'>Add Task</Button>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default InputForm
