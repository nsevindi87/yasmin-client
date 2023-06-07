import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { CheckCircle, PencilSquare, Trash3Fill } from 'react-bootstrap-icons';
import { wordsContext } from "../../Context/wordsListContext"
import { UserContext } from '../../Context/UserContext.js';

const ToDoList = () => {
    const { todoList, getTodoList, handleTodoDelete, handleTodoEdit, handleTodoUpdate } = useContext(wordsContext)

  
    const {profileInfo,getProfileInfo} = useContext(UserContext)
 
    useEffect(()=>{
      const fetchData = async () => {
        try {
          const profileData = await getProfileInfo();
          await getTodoList(profileData.id);
        } catch (error) {
          // Hata yönetimi
        }
      };
      fetchData();
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
                                    className="d-flex"
                                    key={value}>
                                    <div>
                                        <h5 className="ms-2 me-auto">
                                            {task.task}
                                        </h5>
                                        <p className="ms-2 me-auto">
                                            {task.date.slice(0, 10)} - {task.time.slice(0,5)}
                                        </p>
                                       
                                    </div>
                                    <div className='m-auto'>

                                    <Button className=' btn-warning' onClick={() => handleTodoEdit(task)}> <PencilSquare /> </Button>
                                    <Button className='btn-danger' onClick={() => handleTodoDelete(task.id)}> <Trash3Fill /> </Button>
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
