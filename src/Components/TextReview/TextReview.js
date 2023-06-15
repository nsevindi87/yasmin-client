import React from 'react';
import image from "../../Images/error.png"
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Modal, Form, FloatingLabel,Nav } from 'react-bootstrap';



const TextReview = () => {
  return (
    <>
    <h1 className='text-center shadow my-4'>List of texts</h1>
    <Button className='btn-dark text-warning shadow ms-4'><Nav.Link as={NavLink} to="/textreview/english">English Texts</Nav.Link></Button>
    <Button className='btn-dark text-warning shadow ms-4'><Nav.Link as={NavLink} to="/textreview/german">Deutsche Texte</Nav.Link></Button>
    <Button className='btn-dark text-warning shadow ms-4'><Nav.Link as={NavLink} to="/textreview/turkce">Türkçe Metinler</Nav.Link></Button>
{/* metni okuyup tamam butonuna basinca butonun rengi degissin ve calisildi desin.
tabi bunun icin metin tablosu lazim. ing almanca sutun lazim.  Status icin de ayri status ve userid lazim. bu sonraki is*/}
    <div className='d-flex justify-content-center align-item-center'>
      <div className="col-6" style={{paddingTop:"5rem", paddingLeft:"1rem"}}>
          <img src={image} class="img-fluid" alt="Image" style={{width:"100rem"}}/>
        </div>
    </div>
    </>
  )
}

export default TextReview