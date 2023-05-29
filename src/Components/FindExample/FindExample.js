import React, { useContext,useEffect } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext";


const FindExample = () => {
  const {searchTerm, setSearchTerm, searchResults, setSearchResults,getSearchedSentences} = useContext(wordsContext)



  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  }

  useEffect(()=>{
    getSearchedSentences(searchTerm)
    console.log(searchResults)
  },[searchTerm])

  return (
    <Container>
      <h1 className='text-center my-3'>Find Example Sentences</h1>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Please write at least 3 letters"
          value={searchTerm}
          onChange={handleSearch}
          className="my-3"
        />
      </Form.Group>
      <Table hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>English</th>
            <th>Turkish</th>
          </tr>
        </thead>
        <tbody>
          {searchResults?.map((item) => (
            item.map((item,value)=>(
            <tr key={value}>
              <td>{item.id}</td>
              <td>{item.english}</td>
              <td>{item.turkish}</td>
            </tr>

            ))
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FindExample;
