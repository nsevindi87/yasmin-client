import React,{useEffect,useContext} from 'react';
import Card from 'react-bootstrap/Card';
import { wordsContext } from "../../Context/wordsListContext.js";


const ContactMails = () => {
  const { getAllContactMails,contactMails, setContactMails} = useContext(wordsContext)
useEffect(()=>{
    getAllContactMails()
    console.log(contactMails)
},[])

    return (
        <div>
            <h1 className='text-center my-3 py-2 shadow'>Contact Mails</h1>
            {contactMails?.map((mail,index)=>(
            <Card key={index} className="mb-4">
                <Card.Header>{mail[1].name} - {mail[1].email}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            {mail[1].message}{' '}
                        </p>
                        <footer className="blockquote-footer">
                            Message was sent: <cite title="Source Title"> {mail[1].createdAt.slice(0,10)}</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
            )).reverse()}

        </div>
    )
}

export default ContactMails