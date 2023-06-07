import React, { useContext, useEffect, useState } from 'react';
import { wordsContext } from "../../Context/wordsListContext";
import { Button, Modal, Card, Form } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext.js';


const Practice = () => {
    const { greenList, getWordsList, handleModalOpen, handleModalClose, modalContent,showModal } = useContext(wordsContext)
    const [isChecked, setIsChecked] = useState(false);
    const { getProfileInfo,profileInfo,user2} = useContext(UserContext)

    
    //Change the words place
    const shuffledData = [...greenList].sort(() => Math.random() - 0.5);


    useEffect(()=>{
        const fetchData = async () => {
          try {
            const profileData = await getProfileInfo();
            await getWordsList(profileData.id);
          } catch (error) {
            // Hata yönetimi
          }
        };
        console.log(shuffledData)
        fetchData();
      },[])

    return (
        <div>
            <h1 className='text-center my-3'>Practice Green List</h1>
            <Form.Check
                type="checkbox"
                label="Activate to change cards"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mb-3"
            />
            <div style={{ display: 'flex', flexWrap: "wrap", gap: "50px" }}>

                {isChecked ? shuffledData.map((word) => (
                    <Card border="success" style={{ width: '12rem' }}>
                        <Card.Header className='py-3 bg-success p-2 text-dark bg-opacity-75' />
                        <Card.Body>
                            <Button className="bg-success w-100 text-dark bg-opacity-25 border-0" onClick={() => handleModalOpen(word)}>
                                {word.wordSecondMeaning}
                            </Button>
                        </Card.Body>
                    </Card>
                )) : greenList.map((word) => (
                    <Card border="success" style={{ width: '12rem' }}>
                        <Card.Header className='py-3 bg-success p-2 text-dark bg-opacity-50' />
                        <Card.Body>
                            <Button className="bg-success w-100 text-dark bg-opacity-25 border-0" onClick={() => handleModalOpen(word)}>
                                {word.wordSecondMeaning}
                            </Button>
                        </Card.Body>
                    </Card>))
                }

                < Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header>
                        <Modal.Title>{modalContent.word}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card.Text>
                            {modalContent.wordMeaning}
                        </Card.Text>
                        <Card.Text>
                            {modalContent.wordSecondMeaning}
                        </Card.Text>
                        <Card.Text>
                            {modalContent.wordNote}
                        </Card.Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )
}

export default Practice