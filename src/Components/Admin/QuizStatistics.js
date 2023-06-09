import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';


const QuizStatistics = () => {
  return (
    <Container>
      <Row className='mt-5' >
        <Col>
          <h1 className='text-center'>Words Statistics</h1>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr className='text-center'>
                <th>#</th>
                <th>User Name</th>
                <th>User E-mail</th>
                <th>Total Words</th>
                <th>Green List</th>
                <th>Yellow List </th>
                <th>Red List </th>
              </tr>
            </thead>
            <tbody>
              {userWordsNumbers?.map((user, value) => (
                <tr key={value} className='text-center'>
                  <td>{value + 1}</td>
                  <td>{allUsers[value].firstName}</td>
                  <td>{allUsers[value].email}</td>
                  <td>{user.total}</td>
                  <td>{user.green}</td>
                  <td>{user.yellow}</td>
                  <td>{user.red}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      
    </Container>
  )
}

export default QuizStatistics