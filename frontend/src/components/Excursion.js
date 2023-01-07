import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css';
AOS.init({
    duration:1000
});

function Excursion ({ excursion, thedate }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)



         return (
          <div className='background'>
           {/* Generates one row of boxes for excursions list */}
           <div className='row bs'>
             {/* Generates x amount of columns for images*/}
             <div className='col-md-4'>
               <img src={excursion.imageurls[0]} className='small-img' />
             </div>
             {/* Generate x amount of columns for excursion info from databse */}
             <div className='col-md-7'>
               <h1> {excursion.name} </h1>
               {/* <p> {excursion.description}</p> */}
               <b>
                 {/* TODO: might need to add a start time(s) for each excursion */}
                 {/* <p> Maximum Capacity: {excursion.maxcount} People</p> */}
                 <p> Price: ${excursion.price}.00 </p>
                 <p> Duration: ~{excursion.duration}hrs</p>
                 <p> Type : {excursion.type}</p>
               </b>
       
               <div style={{ float: 'right' }}>
       
       
                   {thedate && (
       
                         <Link onClick={() =>window.location.href=`/book/${excursion._id}/${thedate}`}>
                         <button className='btn btn-primary m-2'>Book Now</button>
                         </Link>
       
                   )}
       
       
       
                
                 <button className='btn btn-primary' onClick={handleShow}>View Details</button>
               </div>
             </div>
       
             {/* Pop-up button code, on-click will pull up a pop-up screen that ... */}
             <Modal show={show} onHide={handleClose} size='md'>
               <Modal.Header>
                 <Modal.Title className='modal-tile-home'>
                   {excursion.name}
                 </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                 <Carousel fade prevLabel='' nextLabel=''>
                   {excursion.imageurls.map(url => {
                     return (
                <Carousel.Item onClick={url}>
                  <img
                    className='d-block w-100 big-img'
                    src={url}
                    alt='First slide'
                  />
                </Carousel.Item>
              )
            })}
          </Carousel>
          <br />
          <p> {excursion.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>
  )
}

export default Excursion
