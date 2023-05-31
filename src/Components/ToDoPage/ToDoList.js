import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { CheckCircle, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import { wordsContext } from "../../Context/wordsListContext"

const ToDoList = () => {
    const { todoList, getTodoList } = useContext(wordsContext)

    useEffect(()=>{
        getTodoList()
    },[])
    
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
                                    className="d-flex justify-content-between align-items-start"
                                    key={value}>

                                    <div className="ms-2 me-auto">
                                        {task[1].task} {task[1].date} {task[1].time}
                                    </div>

                                    <Button className=' btn-warning'> <PencilSquare /> </Button>
                                    <Button className='mx-1 btn-success'> <CheckCircle /> </Button>
                                    <Button className='btn-danger'> <Trash3Fill /> </Button>
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
