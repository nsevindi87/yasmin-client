import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, FloatingLabel,Nav } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext"
import { PencilSquare, Trash3Fill  } from 'react-bootstrap-icons'
import { UserContext } from '../../Context/UserContext.js';

const AddWordUnterList = () => {
  const { getWordsList, allWordsList, handleDelete,handleEdit, handleEditList,handleDeleteList  } = useContext(wordsContext)
  const { getProfileInfo,profileInfo,user2} = useContext(UserContext)

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const profileData = await getProfileInfo();
        await getWordsList(profileData.id);
      } catch (error) {
        // Hata yönetimi
      }
    };
    fetchData();
  },[])
  return (
    <>
      <Container fluid>
        <Row >
          <Col lg="12">
            <Table striped bordered hover variant="dark" >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Value 1</th>
                  <th>Value 2</th>
                  <th>Value 3</th>
                  <th>Notes</th>
                  <th>Actions </th>
                  <th>List</th>
                  <th>New List </th>
                </tr>
              </thead>
              <tbody>
                {allWordsList.map((word, value) => (
                  <tr key={value}>
                    <td>{value + 1}</td>
                    <td>{word.word}</td>
                    <td>{word.wordMeaning}</td>
                    <td>{word.wordSecondMeaning}</td>
                    <td>{word.wordNote}</td>
                    <td className='text-center'>
                    <Button onClick={() => handleEdit(word)} variant="warning" className='p-2 mx-1 mb-1'><PencilSquare/></Button>
                    <Button onClick={() => handleDelete(word.id, word.listGroup)} variant="danger mx-1" className='p-2'><Trash3Fill/></Button>
                    </td>
                    <td> {word.wordCategory ? <Button variant={word.wordCategory} onClick={()=> handleDeleteList(word.id)} className='p-2'></Button> : null}</td>
                    <td>
                      {word.wordCategory ? null :
                        <div className='text-center'>
                          <Button variant="success" onClick={() => handleEditList("success", word.id)} className='p-2 '></Button>
                          <Button variant="warning" onClick={() => handleEditList("warning", word.id)} className='p-2 mx-1'></Button>
                          <Button variant="danger" onClick={() => handleEditList("danger", word.id)} className='p-2'></Button>
                        </div>
                      }
                    </td>
                  </tr>
                )).reverse().slice(0, 5)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddWordUnterList