import React,{useContext,useEffect} from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, FloatingLabel,Nav } from 'react-bootstrap';
import {  Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.js';


const UserStatistics = () => {
  const {profileInfo,getProfileInfo,allUsers,getAllUsers} = useContext(UserContext)
  
  useEffect(()=>{
    getAllUsers()
  },[])

  return (
    <Container>
        <Row className='mt-5' >
          <Col>
            <h1 className='text-center'>User List</h1>
            
            <Table striped bordered hover variant="dark">
              <thead>
                <tr className='text-center'>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Second Name</th>
                  <th>E-mail</th>
                  <th>Birthday</th>
                  <th>Role </th>
                  <th>Created Date </th>
                  <th>Actions </th>
                </tr>
              </thead>
              <tbody>
                 {allUsers?.map((user, value) => (
                  <tr key={value} className='text-center'>
                    <td>{value + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.birthday}</td>
                    <td>{user.role}</td>
                    <td>{user.createdAt}</td>
                    <td>XXX</td>
                  </tr>
                ))}
                {/* <>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Word</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <FloatingLabel label="First Value">
                          <Form.Control onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: e.target.value })} type="text" id='word' value={inputValue.word} />
                        </FloatingLabel>

                        <FloatingLabel label="Second Value">
                          <Form.Control className='mt-4' onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: e.target.value })} type="text" id='wordMeaning' value={inputValue.wordMeaning} />
                        </FloatingLabel>

                        <FloatingLabel className='my-4' label="Third Value" >
                          <Form.Control onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: e.target.value })} type="text" id='wordSecondMeaning' value={inputValue.wordSecondMeaning} />
                        </FloatingLabel>

                        <FloatingLabel label="Notes">
                          <Form.Control onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: e.target.value })} as="textarea" id='wordNote' value={inputValue.wordNote} style={{ height: '100px' }} />
                        </FloatingLabel>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={()=>handleUpdate()}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </> */}

              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
  )
}

export default UserStatistics