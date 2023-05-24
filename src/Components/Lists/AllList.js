import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button, ListGroup } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext";
import AsideComponent from '../RightSide/AsideComponent';


const GeneralList = () => {
  const { getWordsList, allWordsList, handleDelete } = useContext(wordsContext)

  useEffect(() => {
    getWordsList()
  }, [allWordsList])

  return (
    <>
      <Container fluid>
        <Row className='mt-5' >
          <Col >
            <h1 className='text-center'>All Word List</h1>
            <div className='mb-1 text-center'>
              <Button className='btn-dark text-warning mx-3'>Training</Button>
              <Button className='btn-dark text-warning'>Test Yourself</Button>
            </div>
            <Table striped bordered hover variant="dark">
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
                {allWordsList?.map((word, value) => (
                  <tr key={value}>
                    <td>{value + 1}</td>
                    <td>{word.word}</td>
                    <td>{word.wordMeaning}</td>
                    <td>{word.wordSecondMeaning}</td>
                    <td>{word.wordNote}</td>
                    <td>
                      <Button variant="warning me-1">Edit</Button>
                      <Button onClick={() => handleDelete(word.id)} variant="danger">Delete</Button>
                    </td>
                    <td> {word.wordCategory ? <Button variant={word.wordCategory}></Button> : null}</td>
                    <td>
                      {word.wordCategory ? null :
                        <div>
                          <Button variant="success" ></Button>
                          <Button variant="warning" className='mx-2'></Button>
                          <Button variant="danger"></Button>
                        </div>
                      }
                    </td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default GeneralList