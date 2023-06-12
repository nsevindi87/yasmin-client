import React, { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import ProtectedLink from "../ProtectedLink";
import { UserContext } from '../../Context/UserContext.js';
import logo from "../../Images/logo.png"

const HeaderLoggedin = () => {

    const { logout, loginWithRedirect, isLoading, isAuthenticated } = useAuth0()
    const { profileInfo } = useContext(UserContext)


    return (
        <Navbar bg="light" variant="light" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/"><img src={logo} alt="logo" style={{width:"5rem",}}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                    {isLoading ? <>
                        loading
                    </>
                        :
                        !isAuthenticated ?
                            <>
                                <Nav className="m-auto my-1 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll>
                                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                                    <Nav.Link as={NavLink} to="/findExample">Find Example</Nav.Link>
                                    <Nav.Link as={NavLink} to="/quiz">Make Practice</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                                    <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                                    <Nav.Link to="logout" onClick={() => loginWithRedirect()} >Log in / Sign up</Nav.Link>
                                </Nav>
                            </> :
                            <>
                                <Nav className="m-auto my-1 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll>
                                    <Nav.Link as={NavLink} to="/addword">Add Word</Nav.Link>
                                    <Nav.Link as={NavLink} to="/todo">Todo</Nav.Link>
                                    <NavDropdown title="Lists" id="navbarScrollingDropdown">
                                        <NavDropdown.Item as={NavLink} to="/greenlist">Green List</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/yellowlist">
                                            Yellow List
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/redlist">
                                            Red List
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} to="/alllist">
                                            All Words
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Library" id="navbarScrollingDropdown">
                                        <NavDropdown.Item as={NavLink} to="/findExample">
                                        Find Example
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/quiz">
                                        Make Practice
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/textreview">
                                        Text Review
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    
                                </Nav>
                                <Nav>
                                    <ProtectedLink name="Admin" link="/admin" user={profileInfo} roles={['admin']} />
                                    <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                                    <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                                    <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                                    <Nav.Link as={NavLink} to="logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} >Log out</Nav.Link>
                                </Nav>
                            </>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderLoggedin