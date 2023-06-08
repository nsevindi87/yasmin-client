import React,{useContext,useState,useEffect} from 'react';
import { wordsContext } from "../../Context/wordsListContext.js";
import { UserContext } from '../../Context/UserContext.js';
import { Container, Row, Col, Table} from 'react-bootstrap';


const WordsStatistics = () => {

  const {getAllWords, allWordsList2 } = useContext(wordsContext)
  const {getAllUsers,allUsers} = useContext(UserContext)

  const [userWordsNumbers, setUserWordsNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => { 
      // Kullanıcıları ve kelime listesini al
      await getAllWords();

      // Kullanıcı ID arrayi
      const userIDs = allUsers.map((user) => user.id);

      const updatedUserWordsNumbers = userIDs.map((userID) => {
        const userWordsListArr = allWordsList2.filter((word) => word.userId === userID);
        const totalWordNum = userWordsListArr.length;
        const greenWordNum = userWordsListArr.filter((word) => word.wordCategory === 'success').length;
        const yellowWordNum = userWordsListArr.filter((word) => word.wordCategory === 'warning').length;
        const redWordNum = userWordsListArr.filter((word) => word.wordCategory === 'danger').length;

        return {
          userID,
          total: totalWordNum,
          green: greenWordNum,
          yellow: yellowWordNum,
          red: redWordNum,
        };
      });

      setUserWordsNumbers(updatedUserWordsNumbers);
      console.log(userWordsNumbers)
      console.log(updatedUserWordsNumbers)
    };
    
    fetchData();
  }, []);//!UI da render etmiyor
  

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

export default WordsStatistics