import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Swal from 'sweetalert2'

function RemoveExcursion({ match }) {

  // const excursionid = match.params.excursionid
  
  const [excursions, setexcursions] = useState([])
  const [excursionid, setid] = useState()
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()

  useEffect(
    () =>
      async function fetchData () {
        try {

          
          const data = await (
            await axios.get('/api/excursions/getallexcursions')
          ).data
         
          setexcursions(data)
         
          setloading(false)
        } catch (error) {
          seterror(error)
          console.log(error)
          setloading(false)
        }
      },
    []
  )

   // Event handler for deleting an excursion
   const handleDelete = async (excursionId) => {
    try {
      setloading(true);
      // Send DELETE request to server
      const result = await (await axios.delete(`/api/excursions/${excursionId}`)).data;
      //console.log(result);
      setloading(false);
      if (result.success) {
        // Handle successful DELETE request
        Swal.fire('Success!', 'Your excursion was deleted!', 'success').then((result) => {
          window.location.href = '/home';
        });
      } else {
        // Handle error
        Swal.fire('Oops!', 'Something went wrong! Please try again.', 'error');
      }
    } catch (error) {
      // Handle error
      console.log(error);
      setloading(false);
      Swal.fire('Oops!', 'Something went wrong! Please try again.', 'error');
    }
  };



  return (

      <div className='row'>
        <div className='col-md-12'>
          <h1>excursions</h1>
          {loading && <Loader />}
  
          <table className='table table-bordered table-dark'>
            <thead className='bs'>
              <tr>
                <th>Excursion Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Max Count</th>
              </tr>
            </thead>
  
            <tbody>
              {excursions.length &&
                excursions.map(excursion => {
                  return (
                    <tr>
                      <td>{excursion._id}</td>
                      <td>{excursion.name}</td>
                      <td>{excursion.type}</td>
                      <td>{excursion.maxcount}</td>
                      <td>
                        <a className='btn btn-danger' onClick={() => handleDelete(excursion._id)}>
                          Delete
                        </a>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default RemoveExcursion