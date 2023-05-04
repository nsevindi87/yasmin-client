import { Form, Button, Navbar, Container,Nav, NavDropdown } from "react-bootstrap";
import { useAuth0 } from '@auth0/auth0-react'


const HeaderLoggedin = () => {
    const {logout} = useAuth0()


    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark" >
                <Container>
                    <Navbar.Brand href="#">Learning App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="m-auto my-1 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/addword" className='mx-5'>Add Word</Nav.Link>
                            <Nav.Link href="/translate" className='mx-5'>Translate</Nav.Link>
                            <NavDropdown title="All Lists" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/greenlist">Green List</NavDropdown.Item>
                                <NavDropdown.Item href="/yellowlist">
                                    Yellow List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/redlist">
                                    Red List
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/alllist">
                                    All Lists
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/todo" className='mx-5'>ToDo</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            <Nav.Link to="logout" onClick={()=>logout({logoutParams:{returnTo: window.location.origin}})} >Log out</Nav.Link>
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
        </div>
    )
}

export default HeaderLoggedin