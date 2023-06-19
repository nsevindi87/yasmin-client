import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, FloatingLabel, Nav } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext.js';


const UserStatistics = () => {
  const { profileInfo, getProfileInfo, allUsers, getAllUsers } = useContext(UserContext)

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Container>
      <Row className='mt-5' >
      <Button variant='warning' className='py-4 mb-2 text-center' >User List</Button>
        <Col>
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
            </tbody>
          </Table>
        </Col>
      </Row>
      
    </Container>
  )
}

export default UserStatistics