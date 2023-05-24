import React, { useContext, useEffect, useState } from 'react';
import { wordsContext } from "../Context/wordsListContext";
import { Button, Modal, Card } from 'react-bootstrap';


const Practice = () => {
    const { allWordsList, getWordsList } = useContext(wordsContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getWordsList()
    }, [allWordsList])

    return (
        <div>
            <h1 className='text-center my-3'>Practice All Words</h1>
            <div style={{ display: 'flex', flexWrap: "wrap", gap: "50px" }}>

                {allWordsList.map((word) => (
                    <Card border="secondary" style={{ width: '12rem' }}>
                        <Card.Body className='pb-0 px-0'>
                            <Card.Title >{word.word}</Card.Title>

                            <Button variant="secondary w-100" onClick={handleShow}>
                                Learn it
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