import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import InputForm from "./TodoInputForm.js"
import ToDoList from './ToDoList.js';


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
