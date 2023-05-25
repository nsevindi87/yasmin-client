import React, { useContext, useEffect, useState } from 'react';
import { wordsContext } from "../Context/wordsListContext";
import { Button, Modal, Card } from 'react-bootstrap';


const Practice = () => {
    const { redList, getWordsList } = useContext(wordsContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const shuffledData = [...redList].sort(() => Math.random() - 0.5);


    useEffect(() => {
        getWordsList()
    }, [])

    return (
        <div>
            <h1 className='text-center my-3'>Practice Red List</h1>
            <div style={{ display: 'flex', flexWrap: "wrap", gap: "50px" }}>

                {shuffledData.map((word) => (
                    <Card border="danger" style={{ width: '12rem' }}>
                        
                        <Card.Header className='py-3 bg-danger p-2 text-dark bg-opacity-75'>

                        </Card.Header>
                        <Card.Body>
                        <Button className="bg-danger w-100 text-dark bg-opacity-25 border-0" onClick={handleShow}>
                            {word.wordSecondMeaning}
                            </Button>

                        </Card.Body>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Card.Text>
                                    {word.wordMeaning}
                                </Card.Text>
                                <Card.Text>
                                    {word.wordSecondMeaning}
                                </Card.Text>
                                <Card.Text>
                                    {word.wordNote}
                                </Card.Text>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Practice