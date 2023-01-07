import axios from 'axios'
import React, { useState } from 'react'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Swal from 'sweetalert2'

function AddExcursion() {

    const[name, setname] = useState('')
    const[price, setprice] = useState('')
    const[maxcount, setmaxcount] = useState()
    const[size, setsize] = useState()
    const[description, setdescription] = useState()
    const[duration, setduration] =  useState()
    const[type, settype] = useState()
    const[imgurl1, setimgurl1] = useState()
    const[imgurl2, setimgurl2] = useState()
    const[imgurl3, setimgurl3] = useState()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    async function addExcursion() {

      const newexcursion = {
        name,
        imageurls:[imgurl1, imgurl2, imgurl3],
        price,
        type,
        maxcount,
        size,
        duration,
        description
        
        
      }

      //console.log(newexcursion)

      try {
        
        setloading(true)
        const result = await ( await axios.post('/api/excursions/addexcursion', newexcursion)).data
        console.log(result)
        setloading(false)
        Swal.fire("Success!", "Your excursion was added!", "success").then(result=>{
            window.location.href="/home"
        })
        
      } catch (error) {
        
        console.log(error)
        setloading(false)
        Swal.fire("Oops!", "Something went wrong! Please try again.", "error")


      }


    }

  return (
    
    <div className='row'>
          
        <div className='col-md-5'>
        {loading && <Loader/>}
            <input type='text' className='form-control' placeholder='excursion name' 
            value={name} onChange={(e)=>{setname(e.target.value)}}/>

            <input type='text' className='form-control' placeholder='Image Url 1'
            value={imgurl1} onChange={(e)=>{setimgurl1(e.target.value)}}  />

            <input type='text' className='form-control' placeholder='Image Url 2' 
            value={imgurl2} Change={(e)=>{setimgurl2(e.target.value)}} />

            <input type='text' className='form-control' placeholder='Image Url 3' 
            value={imgurl3} onChange={(e)=>{setimgurl3(e.target.value)}} />

            <input type='text' className='form-control' placeholder='cost per ticket'
            value={price} onChange={(e)=>{setprice(e.target.value)}} />

            <input type='text' className='form-control' placeholder='type' 
             value={type} onChange={(e)=>{settype(e.target.value)}} />
            on

            <input type='text' className='form-control' placeholder='max count'
            value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}  />

           

           

            
        </div>

        <div className='col-md-5'>

            <input type='text' className='form-control' placeholder='size (if boat excursion)'
            value={size} onChange={(e)=>{setsize(e.target.value)}}  />

            <input type='text' className='form-control' placeholder='duration' 
            value={duration} onChange={(e)=>{setduration(e.target.value)}} />

            <input type='text' className='form-control' placeholder='description'
            value={description} onChange={(e)=>{setdescription(e.target.value)}}  />

        

        

        <div className='text-right'>

            <button className='btn btn-primary mt-2' onClick={addExcursion}> Add Excursion</button>
        </div>

        </div>

    </div>
  )
}

export default AddExcursion