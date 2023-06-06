import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { CheckCircle, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import { wordsContext } from "../../Context/wordsListContext"

const ToDoList = () => {
    const { todoList, getTodoList, handleTodoDelete, handleTodoEdit, handleTodoUpdate } = useContext(wordsContext)

    useEffect(() => {
        getTodoList()
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col className='mt-5'>
                        <h1 className='text-center'>To-Do List</h1>
                        <ListGroup as="ol" numbered>
                            {todoList?.map((task, value) => (
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex"
                                    key={value}>
                                    <div>


                                        <h5 className="ms-2 me-auto">
                                            {task[1].task}
                                        </h5>
                                        <p className="ms-2 me-auto">
                                            {task[1].date.slice(0, 10)} - {task[1].time.slice(0,5)}
                                        </p>
                                       
                                    </div>
                                    <div className='m-auto'>

                                    <Button className=' btn-warning' onClick={() => handleTodoEdit(task[1])}> <PencilSquare /> </Button>
                                    <Button className='btn-danger' onClick={() => handleTodoDelete(task[1].id)}> <Trash3Fill /> </Button>
                                    </div>
                                </ListGroup.Item>

                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ToDoList
