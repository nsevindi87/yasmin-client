import React, { useContext,useState,useEffect } from 'react';
import { Container, FloatingLabel, Form, Button,Row,Col} from 'react-bootstrap';
import AddWordUnterList from './AddWordUnterList';
import {wordsContext} from "../../Context/wordsListContext"
import { UserContext } from '../../Context/UserContext.js';
import { useAuth0 } from '@auth0/auth0-react';


const AddWord = () => {
  const { inputValue,getWordsList, setInputValue, handleNewWord, handleCancel,
    showUpdate,handleUpdate } = useContext(wordsContext)

    const { getProfileInfo,dene,profileInfo} = useContext(UserContext)

    const {isAuthenticated } = useAuth0();

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
      <Container className='bg-light' style={{height:"100vh"}}>
        <Row>
          <Col>
            <h1 className='mt-5 text-center shadow mb-4 rounded'>Add New Word</h1>

            <FloatingLabel label="First Value">
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} type="text" id='word' value={inputValue.word} />
            </FloatingLabel>

            <FloatingLabel label="Second Value">
              <Form.Control className='mt-4' onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} type="text" id='wordMeaning' value={inputValue.wordMeaning} />
            </FloatingLabel>

            <FloatingLabel className='my-4' label="Third Value" >
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} type="text" id='wordSecondMeaning' value={inputValue.wordSecondMeaning} />
            </FloatingLabel>

            <FloatingLabel  label="Notes">
              <Form.Control onChange={(e)=>setInputValue({...inputValue, [e.target.id]:e.target.value})} as="textarea" id='wordNote' value={inputValue.wordNote} style={{ height: '100px' }}/>
            </FloatingLabel>

            <div className='mt-4'>
            <Row>
              <Col>
              <Button onClick={handleCancel} variant="danger w-100">Cancel</Button>
              </Col>
              <div style={{ width: '10px' }}></div> {/* Ara boşluk */}
              <Col>
              {showUpdate ? <Button onClick={handleUpdate} variant="warning w-100">Update</Button> : <Button onClick={handleNewWord} variant="primary w-100">Add</Button> }
              </Col>
            </Row>
            </div><br />
            <hr />
            <h1 className='mt-2 text-center'>Recently Added</h1>
            <AddWordUnterList/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddWord