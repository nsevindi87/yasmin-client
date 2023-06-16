import React, { useContext, useEffect, useState } from 'react';
import { wordsContext } from "../../Context/wordsListContext";
import { UserContext } from '../../Context/UserContext.js';
import { Container, Row, Nav, Col, Tab, Form } from 'react-bootstrap';
import PersonalText from './PersonalText';
import AddNewPersonalText from './AddNewPersonalText';


const PersonalTexts = () => {
    const { getWordsList, allWordsList, handleDelete, handleEdit, handleClose, show, setInputValue, inputValue, handleUpdate,
        handleEditList, handleDeleteList, getQuizQuestions } = useContext(wordsContext)

    const { profileInfo, getProfileInfo } = useContext(UserContext)

    const [personalTexts, setPersonalTexts] = useState([])

    //GET ALL DATAS By ID==========================================================
    const getTextsList = async (pId) => {
        try {
            const BASE_URL = "http://localhost:3302"

            const response = await fetch(`${BASE_URL}/textreview/personaltexts/${pId}`);
            const data = await response.json();
            setPersonalTexts(data)
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch posts")
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await getProfileInfo();
                await getTextsList(profileData.id);
            } catch (error) {
                //HATA MESAJI
            }
        };
        fetchData();
    }, [])

    return (
        <Container fluid className='shadow' style={{ backgroundColor: '#ededed' }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row >
                    <Col sm={2} style={{ height: "100vh" }}>
                        <Nav variant="pills" className="flex-column" style={{ position: 'sticky', top: 50 }}>
                            <Nav.Item className='rounded my-2' style={{ backgroundColor: '#aff4cc' }}>
                                <Nav.Link eventKey="newPersonalText">Add New Text</Nav.Link>
                            </Nav.Item>
                            {personalTexts?.map((text, value) => (
                                <Nav.Item className='rounded my-2' style={{ backgroundColor: '#bcc7cc' }}>
                                    <Nav.Link eventKey={text.title}>{text.title}</Nav.Link>
                                </Nav.Item>
                            ))}

                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            {personalTexts?.map((text, value) => (
                                <Tab.Pane eventKey={text.title}><PersonalText /></Tab.Pane>
                                ))}
                                <Tab.Pane eventKey="newPersonalText"><AddNewPersonalText /></Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

export default PersonalTexts