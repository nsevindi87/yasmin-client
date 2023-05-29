import React, { useState } from 'react';
import { Container, Form, Table } from 'react-bootstrap';

const searchData = [
  { id: 1, german: 'Haus', turkish: 'Ev' },
  { id: 2, german: 'Auto', turkish: 'Araba' },
  { id: 3, german: 'Buch', turkish: 'Kitap' },
  { id: 4, german: 'Schule', turkish: 'Okul' },
  { id: 5, german: 'Stadt', turkish: 'Şehir' },
  // Diğer veri örnekleri
];



const FindExample = () => {
  const {searchTerm, setSearchTerm, searchResults, setSearchResults,getSearchedSentences} = useContext(wordsContext)



  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length >= 3) { // En az 3 harf yazıldıysa arama yap
      const results = searchData.filter(item =>
        item.german.toLowerCase().includes(term.toLowerCase()) ||
        item.turkish.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(()=>{
    getSearchedSentences(searchTerm)
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
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>German</th>
            <th>Turkish</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.german}</td>
              <td>{item.turkish}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FindExample;
