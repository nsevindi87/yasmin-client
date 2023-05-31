import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import InputForm from "./TodoInputForm"
import ToDoList from './ToDoList';


const ToDoMain = () => {
    return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <Col>
                        <InputForm />
                        <ToDoList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ToDoMain
