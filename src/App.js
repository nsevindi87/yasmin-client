import Header from "./Components/Header/Header.js"
import { Outlet } from 'react-router-dom';
import WordsListContextProvider from './Context/wordsListContext';
import AsideComponent from "./Components/SideBar/AsideComponent.js"
import { Col, Row } from 'react-bootstrap';
import { UserContextProvider } from "./Context/UserContext.js";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from './Components/Footer/Footer';


function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div >
      <UserContextProvider>
        <WordsListContextProvider>
          <Header />
          {!isAuthenticated ? <Outlet /> 
          : <Row>
          <Col lg="9" >
            <Outlet />
          </Col>
          <Col lg="3" className="d-none d-md-block">
            <AsideComponent />
          </Col>
        </Row> }
        <Footer/>
        </WordsListContextProvider>
      </UserContextProvider>

    </div>
  )
}

export default App;
