import React, { useContext, useEffect } from 'react';
import { Container,Row,Col,Table, Button} from 'react-bootstrap';
import Header from "../Header-Footer/Header";
import {wordsContext} from "../../Context/wordsListContext"


const RedList = () => {
  const { redList, getRedList, allWordsList,handleDelete } = useContext(wordsContext)

  useEffect(()=>{
    getRedList()
  }, [redList])
  return (
    <>
    <Header/>
    <Container fluid>
    <Row className='mt-5'>
          <Col lg="10" className='d-flex justify-content-between'>
            <h1>Green List</h1>
            <div>
            <Button className='btn-dark text-warning mx-3'>Training</Button>
            <Button className='btn-dark text-warning'>Test Yourself</Button>
            </div>
          </Col>
        </Row>
      <Row>
        <Col lg="10">
            <Table striped bordered hover variant="danger">
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
              {redList.map((word,value) => (
                  <tr key={value}>
                    <td>{value + 1}</td>
                    <td>{word.firstValue}</td>
                    <td>{word.secondValue}</td>
                    <td>{word.thirdValue}</td>
                    <td>{word.note}</td>
                    <td>
                      <Button variant="warning me-2">Edit</Button>
                      <Button onClick={()=> handleDelete(word.id, word.listGroup)} variant="danger">Delete</Button>
                    </td>
                    <td> <Button  variant={word.listGroup}></Button></td>
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
        <Col lg="3"></Col>
      </Row>
    </Container>
    </>
  )
}

export default RedList