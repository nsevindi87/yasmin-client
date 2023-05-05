import { Form, Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddWord from "../AddWordPage/AddWord.js"
import Translate from "../TranslatePage/Translate.js";
import AllList from '../Lists/AllList';
import YellowList from '../Lists/YellowList';
import GreenList from '../Lists/GreenList';
import RedList from '../Lists/RedList';
import Home from '../MainPage/Home';
import Todo from "../ToDoPage/ToDoMain.js";
import Profile from "../ProfilePage/Profile.js";

const HeaderLoggedin = () => {

    const { logout, loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        <div className="App">
            <div>
                {isAuthenticated ?
                    <BrowserRouter>
                        <div>
                            <>
                                <Navbar bg="dark" expand="lg" variant="dark" >
                                    <Container>
                                        <Navbar.Brand as={Link} to="/">Learning App</Navbar.Brand>
                                        <Navbar.Toggle aria-controls="navbarScroll" />
                                        <Navbar.Collapse id="navbarScroll">
                                            <Nav className="m-auto my-1 my-lg-0"
                                                style={{ maxHeight: '100px' }}
                                                navbarScroll>
                                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                                <Nav.Link as={Link} to="/addword" className='mx-5'>Add Word</Nav.Link>
                                                <Nav.Link as={Link} to="/translate" className='mx-5'>Translate</Nav.Link>
                                                <NavDropdown title="All Lists" id="navbarScrollingDropdown">
                                                    <NavDropdown.Item as={Link} to="/greenlist">Green List</NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/yellowlist">
                                                        Yellow List
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Item as={Link} to="/redlist">
                                                        Red List
                                                    </NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item as={Link} to="/alllist">
                                                        All Lists
                                                    </NavDropdown.Item>
                                                </NavDropdown>

                                                <Nav.Link as={Link} to="/todo" className='mx-5'>ToDo</Nav.Link>
                                            </Nav>
                                            <Nav>
                                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                                <Nav.Link as={Link} to="logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} >Log out</Nav.Link>
                                            </Nav>
                                            <Form className="d-flex ">
                                                <Form.Control
                                                    type="search"
                                                    placeholder="Search"
                                                    className="me-2"
                                                    aria-label="Search"
                                                />
                                                <Button variant="outline-success" className='w-50'>Search Bar</Button>
                                            </Form>
                                        </Navbar.Collapse>
                                    </Container>
                                </Navbar>
                            </>
                            <div>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/addword" element={<AddWord />} />
                                    <Route path="/translate" element={<Translate />} />
                                    <Route path="/addword" element={<AddWord />} />
                                    <Route path="/todo" element={<Todo />} />
                                    <Route path="/alllist" element={<AllList />} />
                                    <Route path="/yellowlist" element={<YellowList />} />
                                    <Route path="/greenlist" element={<GreenList />} />
                                    <Route path="/redlist" element={<RedList />} />
                                    <Route path="/profile" element={<Profile />} />
                                </Routes>
                            </div>
                        </div>

                    </BrowserRouter> :
                    <BrowserRouter>
                        <div>
                            <Navbar bg="dark" expand="lg" variant="dark" >
                                <Container>
                                    <Navbar.Brand as={Link} to="/">Learning App</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="navbarScroll" />
                                    <Navbar.Collapse id="navbarScroll">
                                        <Nav className="m-auto my-1 my-lg-0"
                                            style={{ maxHeight: '100px' }}
                                            navbarScroll>
                                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                                            <Nav.Link as={Link} to="/translate" className='mx-5'>Translate</Nav.Link>
                                        </Nav>
                                        <Nav>
                                            <Nav.Link to="logout" onClick={() => loginWithRedirect()} >Log in</Nav.Link>
                                        </Nav>
                                        <Form className="d-flex ">
                                            <Form.Control
                                                type="search"
                                                placeholder="Search"
                                                className="me-2"
                                                aria-label="Search"
                                            />
                                            <Button variant="outline-success" className='w-50'>Search Bar</Button>
                                        </Form>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <div>
                                <Routes>
                                    <Route path="/translate" element={<Translate />} />
                                    <Route path="/" element={<Home />} />
                                </Routes>
                            </div>
                        </div>
                    </BrowserRouter>
                }
            </div>
        </div>
    )
}

export default HeaderLoggedin