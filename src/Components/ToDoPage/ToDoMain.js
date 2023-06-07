import React,{useContext,useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import InputForm from "./TodoInputForm.js"
import ToDoList from './ToDoList.js';
import { UserContext } from '../../Context/UserContext.js';
import { wordsContext } from "../../Context/wordsListContext";


const ToDoMain = () => {

    const {profileInfo,getProfileInfo} = useContext(UserContext)

   const { getTodoList} = useContext(wordsContext)

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const profileData = await getProfileInfo();
          await getTodoList(profileData.id);
          console.log(profileData)
        } catch (error) {
          // Hata yönetimi
        }
      };
      fetchData();
    },[])
    
    return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <Col>
                        <InputForm />
                        <ToDoList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ToDoMain
