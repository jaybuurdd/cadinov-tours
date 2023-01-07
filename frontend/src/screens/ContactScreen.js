import React, {useState} from 'react'


import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button,
  Form,
  Col
} from 'reactstrap'

import { FaFacebook, FaWhatsapp } from 'react-icons/fa'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({})

const ContactScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  return (
    <Card className='mx-auto mt-5 bs' data-aos='flip-down' style={{ maxWidth: '600px' }}>
      <CardHeader>
        <CardTitle><h1><b>CONTACT</b></h1></CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup row>
            <Label for='name' sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Enter your name'
                onChange={e => setName(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='email' sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email'
                onChange={e => setEmail(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='message' sm={2}>
              Message
            </Label>
            <Col sm={10}>
              <Input
                type='textarea'
                name='message'
                id='message'
                placeholder='Enter your message'
                onChange={e => setMessage(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 2 }}>
            <Button color='primary' onClick={() =>{
                window.location.href=`https://docs.google.com/forms/d/e/1FAIpQLSdu-SjLVVkiUSNokoLJ0EBwEJqcaxVWRTCocGp-9l3y8eaSlg/viewform?usp=pp_url&entry.1777451628=${name}&entry.2061057274=${email}&entry.520750728=${message}`
            }

            }>Send</Button>
            </Col>
          </FormGroup>
        </Form>
        <div className='mt-4 d-flex '>
          <a
            href='https://www.facebook.com/excursionespuntacanacadinov/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaFacebook size={32} />
          </a>
          <a
            href='https://wa.me/18096619786'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaWhatsapp size={32} />
          </a>
        </div>
      </CardBody>
    </Card>
  )
}

export default ContactScreen
