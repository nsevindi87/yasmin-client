import React, { useContext, useEffect, useState } from 'react';
import { wordsContext } from "../../Context/wordsListContext.js";
import { UserContext } from '../../Context/UserContext.js';
import { Container, Row, Nav, Col, Tab, Form } from 'react-bootstrap';
import AddNewPersonalText from './AddNewPersonalText.js';
import PersonalText from './PersonalText';



const PersonalTexts = () => {
    const {getTextsListByUserId,personalTexts, setPersonalTexts,getpersonalTextById,personalText, setPersonalText} = useContext(wordsContext)

    const { getProfileInfo } = useContext(UserContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await getProfileInfo();
                await getTextsListByUserId(profileData.id);
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
                        <Nav variant="pills" className="flex-column admin-nav" style={{ position: 'sticky', top: 50 }}>
                            <Nav.Item className='rounded my-2' style={{ backgroundColor: '#aff4cc' }}>
                                <Nav.Link eventKey="newPersonalText">Add New Text</Nav.Link>
                            </Nav.Item>
                             {personalTexts?.map((text, value) => (
                                <Nav.Item key={value} className='rounded my-2' style={{ backgroundColor: '#bcc7cc' }}>
                                    <Nav.Link eventKey={text[1].title} onClick={() => getpersonalTextById(text[1].id)} >{text[1].title}</Nav.Link>
                                </Nav.Item>
                            ))} 

                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            {personalTexts?.map((text, value) => (
                                <Tab.Pane eventKey={text[1].title}><PersonalText /></Tab.Pane>
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

/* 



const PersonalTexts = () => {
  
    

    return (
        
    )
}

export default PersonalTexts */