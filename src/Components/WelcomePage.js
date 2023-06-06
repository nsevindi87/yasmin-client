import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, FloatingLabel, Form, Button, Row, Col } from 'react-bootstrap';


export default function WelcomePage() {

  let navigate = useNavigate();
  const { user } = useAuth0();

  const [userValues, setUserValues] = useState({
    firstName: "",
    lastName: "",
    email: user?.email,
    birthday: ""
})


  const handleNewUser = async () => {
      try {
        console.log("basliyor")
          const response = await fetch(`http://localhost:3302/users`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(userValues),
          });
          console.log("kullanici bilgileri kaydedildi")
          navigate("/profile")
          console.log("profile gidiyorum")

          if (!response.ok) {
              throw new Error("Failed to create post");
          }
          console.log("profile gidiyor")
      } catch (error) {
          console.error(error);
      }
  };



    return (
        <>
            <Container className='bg-light' style={{ height: "100vh" }}>
                <Row>
                    <Col>
                        <h1 className='mt-5 text-center'>Register Page</h1>

                        <FloatingLabel label="First Name">
                            <Form.Control onChange={(e) => setUserValues({ ...userValues, [e.target.id]: e.target.value })} type="text" id='firstName' value={userValues.firstName} />
                        </FloatingLabel>

                        <FloatingLabel label="Second Value">
                            <Form.Control className='mt-4' onChange={(e) => setUserValues({ ...userValues, [e.target.id]: e.target.value })} type="text" id='lastName' value={userValues.lastName} />
                        </FloatingLabel>

                        <FloatingLabel className='my-4' label="email Value" >
                            <Form.Control onChange={(e) => setUserValues({ ...userValues, [e.target.id]: e.target.value })} type="email" id='email' value={user?.email} />
                        </FloatingLabel>

                        <FloatingLabel label="birthday">
                            <Form.Control onChange={(e) => setUserValues({ ...userValues, [e.target.id]: e.target.value })} type="date" id='birthday' value={userValues.birthday} style={{ height: '100px' }} />
                        </FloatingLabel>

                        <div className='mt-4'>
                            <Button onClick={handleNewUser} variant="primary w-50">Submit</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}