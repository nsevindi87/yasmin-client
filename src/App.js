import Header from "./Components/Header-Footer/Header.js"
import { Outlet } from 'react-router-dom';
import WordsListContextProvider from './Context/wordsListContext';
import AsideComponent from "./Components/SideBar/AsideComponent.js"
import { Col, Row } from 'react-bootstrap';
import { UserContextProvider } from "./Context/UserContext.js";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from './Context/UserContext.js';
import React, { useContext, useEffect, useState } from 'react'

function App() {
  const { user, isAuthenticated } = useAuth0();

  const [profileInfo2, setProfileInfo2] = useState(null)


  const getProfileInfo2 = async () => {
    try {
      const response = await fetch(`http://localhost:3302/users/profile/${user.email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setProfileInfo2(data)
      return data
    } catch (error) {
      throw new Error("Failed to fetch posts")
    }
  };


  useEffect(() => {
    getProfileInfo2()
  }, [])

  return (
    <div >
      <UserContextProvider>
        <WordsListContextProvider>
          <Header />
          {!isAuthenticated ? (
            <Outlet />
          ) : profileInfo2 && profileInfo2.role !== "admin" ? (
            <Row>
              <Col lg="9">
                <Outlet />
              </Col>
              <Col lg="3" className="d-none d-md-block">
                <AsideComponent />
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col lg="12">
                <Outlet />
              </Col>
            </Row>
          )}


        </WordsListContextProvider>
      </UserContextProvider>

    </div >
  )
}

export default App;
