import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import AsideComponent from '../RightSide/AsideComponent';
import InputForm from "./InputForm"
import ToDoList from './ToDoList';


const ToDoMain = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col lg="9">
                        <InputForm />
                        <ToDoList />
                    </Col>
                    <Col lg="3">
                        <AsideComponent />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ToDoMain
