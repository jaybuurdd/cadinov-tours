import React, { useState } from 'react'
import { css } from '@emotion/react'
import HashLoader from 'react-spinners/HashLoader'

function Loader () {
  // let [loading, setLoading] = useState(true)

  return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '150px'}}>
      <div className='sweet-loading'>
        <HashLoader color={'#256395'} loading={true} css='' size={80} />
      </div>
    </div>
  )
}

export default Loader
