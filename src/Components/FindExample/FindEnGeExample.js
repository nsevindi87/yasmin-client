import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext";
import CopyToClipboard from 'react-copy-to-clipboard';
import { Toast, ToastContainer } from 'react-bootstrap';


const FindEnGeExample = () => {
  const { searchTerm, setSearchTerm, searchResults, setSearchResults, getSearchedSentencesEnGe } = useContext(wordsContext)


  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    getSearchedSentencesEnGe(term)
  }

  useEffect(() => {
  }, [searchTerm])

  return (
    <Container>
      <h1 className='text-center  my-4 p-2 shadow'>Find English or German Example Sentences</h1>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Please write !"
          onChange={handleSearch}
          className="my-3"
        />
      </Form.Group>
      <div style={{ height: '450px', overflowY: 'scroll' }}>
        <Table hover variant="dark">
          <thead style={{ position: 'sticky', top: 0, backgroundColor: 'red', overflowY: 'scroll' }}>
            <tr>
              <th style={{ width: '50px' }}>Order</th>
              <th>English</th>
              <th>German</th>
            </tr>
          </thead>
          <tbody>
            {searchResults?.map((item, value) => (
              <tr key={value}>

                <td>{value + 1}</td>
                <td>
                  <CopyToClipboard text={item[1].english} onCopy={handleCopy}>
                    <div>
                      {item[1].english}
                    </div>
                  </CopyToClipboard>
                </td>
                <td>
                  <CopyToClipboard text={item[1].german} onCopy={handleCopy}>
                    <div>
                      {item[1].german}
                    </div>
                  </CopyToClipboard>
                </td>

              </tr>
            )).slice(0, 100)}
          </tbody>
        </Table>
      </div>
      <hr></hr>
      <h4 className='text-center'> There are currently <span className='text-danger'> 417726</span> sample sentences!</h4>
      <p className='text-center my-3'> * Double click the sentence you want to copy!</p>
      <hr></hr>
      <ToastContainer className="p-3 " position="bottom-start">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide >
          <Toast.Body style={{ background: 'green', color: 'white' }}>Kopyalandı!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default FindEnGeExample;
