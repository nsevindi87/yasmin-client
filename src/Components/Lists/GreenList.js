import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext"
import AsideComponent from '../RightSide/AsideComponent';


const GreenList = () => {
  const { greenList,getWordsList, handleDelete } = useContext(wordsContext)

  useEffect(() => {
    getWordsList()
  }, [greenList])
  return (
    <>
      <Container>
        <Row className='mt-5'>
          <Col>
            <h1 className='text-center'>Green List</h1>
            <div className='mb-1 text-center'>
              <Button className='btn-dark text-warning mx-3'>Training</Button>
              <Button className='btn-dark text-warning'>Test Yourself</Button>
            </div>
            <Table striped bordered hover variant="success">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Value 1</th>
                  <th>Value 2</th>
                  <th>Value 3</th>
                  <th>Notes</th>
                  <th>Actions </th>
                  <th>List </th>
                  <th>New List </th>
                </tr>
              </thead>
              <tbody>
                {greenList?.map((word, value) => (
                  <tr key={value}>
                    <td>{value + 1}</td>
                    <td>{word.word}</td>
                    <td>{word.wordMeaning}</td>
                    <td>{word.wordSecondMeaning}</td>
                    <td>{word.wordNote}</td>
                    <td>
                      <Button variant="warning me-2">Edit</Button>
                      <Button onClick={() => handleDelete(word.id, word.listGroup)} variant="danger">Delete</Button>
                    </td>
                    <td> <Button variant={word.listGroup}></Button></td>
                    <td>
                      <Button variant="success"></Button>
                      <Button variant="warning" className='mx-2'></Button>
                      <Button variant="danger"></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          {/* <Col lg="3">
            <AsideComponent />
          </Col>   */} 
        </Row>
      </Container>
    </>
  )
}

export default GreenList