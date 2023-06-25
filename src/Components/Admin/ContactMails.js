import React, { useEffect, useContext, useState } from 'react';
import { wordsContext } from "../../Context/wordsListContext.js";
import { Card, Button } from 'react-bootstrap';
import { MdCheckCircle } from 'react-icons/md';




const ContactMails = () => {
    const { getAllContactMails, contactMails, setContactMails } = useContext(wordsContext)
    const [selected, setSelected] = useState(false);

    const handleToggleSelection = () => {
        setSelected(!selected);
    };

    useEffect(() => {
        getAllContactMails()
        console.log(contactMails)
    }, [])

    return (
        <div className='mt-5'>
            <Button variant='warning' className='py-4 mb-2 text-center w-100'>Contact Emails</Button>
            {contactMails?.map((mail, index) => (
                <Card key={index} className="mb-4">
                    <Card.Header className='bg-warning'>{mail[1].name} - {mail[1].email}
                        <MdCheckCircle
                            className={`float-end ${selected ? 'text-success' : 'text-danger'}`}
                            onClick={handleToggleSelection}
                        />
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>
                                {' '}
                                {mail[1].message}{' '}
                            </p>
                            <footer className="blockquote-footer">
                                Message was sent: <cite title="Source Title"> {mail[1].createdAt.slice(0, 10)}</cite>
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            )).reverse()}
        </div>
    )
}

export default ContactMails