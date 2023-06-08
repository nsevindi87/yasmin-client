import React, { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import ProtectedLink from "../ProtectedLink";
import { UserContext } from '../../Context/UserContext.js';

const HeaderLoggedin = () => {

    const { logout, loginWithRedirect, isLoading, isAuthenticated } = useAuth0()
    const { profileInfo } = useContext(UserContext)


    return (
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Learning App</Navbar.Brand>
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
                                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link to="logout" onClick={() => loginWithRedirect()} >Log in / Sign up</Nav.Link>
                                    </Nav>
                                </> :
                                <>
                                    <Nav className="m-auto my-1 my-lg-0"
                                        style={{ maxHeight: '100px' }}
                                        navbarScroll>
                                        <Nav.Link as={NavLink} to="/addword">Add Word</Nav.Link>
                                        <Nav.Link as={NavLink} to="/findExample">Find Example</Nav.Link>
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

                                        <Nav.Link as={NavLink} to="/todo">ToDo</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <ProtectedLink name="Admin" link="/admin" user={profileInfo}  roles={['admin']}/>
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