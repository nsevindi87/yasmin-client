import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext";
import CopyToClipboard from 'react-copy-to-clipboard';
import { Toast,ToastContainer } from 'react-bootstrap';




const FindExample = () => {
  const { searchTerm, setSearchTerm, searchResults, setSearchResults, getSearchedSentences } = useContext(wordsContext)


  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    getSearchedSentences(term)
  }

  useEffect(() => {
  }, [searchTerm])

  return (
    <Container>
      <h1 className='text-center my-3'>Find Example Sentences</h1>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Please write !"
          onChange={handleSearch}
          className="my-3"
        />
      </Form.Group>
      <Table hover variant="dark">
        <thead>
          <tr>
            <th>Order</th>
            <th>#</th>
            <th>English</th>
            <th>Turkish</th>
          </tr>
        </thead>
        <tbody>
          {searchResults?.map((item, value) => (
            <tr key={value}>

              <td>{value + 1}</td>
              <td>{item[1].id}</td>
              <td>
                <CopyToClipboard text={item[1].english} onCopy={handleCopy}>
                  <div>
                    {item[1].english}
                  </div>
                </CopyToClipboard>
              </td>
              <td>
                <CopyToClipboard text={item[1].turkish} onCopy={handleCopy}>
                  <div>
                    {item[1].turkish}
                  </div>
                </CopyToClipboard>
              </td>

            </tr>
          )).slice(0, 10)}
        </tbody>
      </Table>
      <hr></hr>
      <h4 className='text-center'> <span className='text-danger'>{searchResults.length} </span> sentences were found!</h4>
      <p className='text-center my-3'> * Double click the sentence you want to copy!</p>
      <hr></hr>
      <ToastContainer className="p-3 " position="bottom-start">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide >
          <Toast.Body style={{ background: 'green', color: 'white'}}>Kopyalandı!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default FindExample;
