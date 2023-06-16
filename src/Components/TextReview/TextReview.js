import React,{useContext,useEffect} from 'react';
import image from "../../Images/selectLang.png"
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Modal, Form, FloatingLabel,Nav } from 'react-bootstrap';
import { wordsContext } from "../../Context/wordsListContext.js";


const TextReview = () => {
  const { getTextReviews } = useContext(wordsContext)
  
  useEffect(()=>{
    getTextReviews()
  },[])

  return (
    <div className='text-center'>
    <h1 className='shadow my-4'>Please select the option you want to study in</h1>
    <div>
    <Button className='btn-warning shadow w-50 mb-5'><Nav.Link as={NavLink} to="/textreview/personal">Personal Texts</Nav.Link></Button>
    </div>
    <div>
    <Button className='btn-dark text-warning shadow w-25'><Nav.Link as={NavLink} to="/textreview/english">English Texts</Nav.Link></Button>
    <Button className='btn-dark text-warning shadow w-25 mx-3'><Nav.Link as={NavLink} to="/textreview/german">Deutsche Texte</Nav.Link></Button>
    <Button className='btn-dark text-warning shadow w-25'><Nav.Link as={NavLink} to="/textreview/turkish">Türkçe Metinler</Nav.Link></Button>
    </div>
    <div className='d-flex justify-content-center align-item-center'>
      <div className="col-6" style={{paddingTop:"5rem", paddingLeft:"1rem"}}>
          <img src={image} class="img-fluid" alt="Image" style={{width:"100rem"}}/>
        </div>
    </div>
    </div>
  )
}

export default TextReview