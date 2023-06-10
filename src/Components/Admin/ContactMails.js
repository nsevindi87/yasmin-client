import React from 'react';
import Card from 'react-bootstrap/Card';


const ContactMails = () => {
    return (
        <div>
            <h1 className='text-center my-3 py-2 shadow'>Contact Mails</h1>
            <Card>
                <Card.Header>Quote</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                            posuere erat a ante.{' '}
                        </p>
                        <footer className="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ContactMails