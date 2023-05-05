import React from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { CheckCircle, PencilSquare, Trash3Fill  } from 'react-bootstrap-icons'


const ToDoList = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col className='mt-5'>
                        <h1 className='text-center'>To-Do List</h1>
                        <ListGroup as="ol" numbered>
                            {/* Görevler tarih siralamasina girecek
                            1. Siradaki görev uyari olarak ön sayfaya gelecek
                            */}
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Search</div>
                                   Search bölümü olacak ve filtre gibi calisacak
                                </div>
                                
                                <Button className=' btn-warning'> <PencilSquare/> </Button>
                                <Button className='mx-1 btn-success'> <CheckCircle/> </Button>
                                <Button className='btn-danger'> <Trash3Fill/> </Button>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">Tablolar</div>
                                    Tablolarin genisligi sabit olacak, ki ekleme cikarmalarda devamli boyut degismesin
                                </div>
                                
                                <Button className=' btn-warning'> <PencilSquare/> </Button>
                                <Button className='mx-1 btn-success'> <CheckCircle/> </Button>
                                <Button className='btn-danger'> <Trash3Fill/> </Button>
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ToDoList
