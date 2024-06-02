import React from 'react'
import './styles.scss'

const NotFound: React.FC = () => {
  return (
    <div className='nodata-wrap'>
        <img className='nodata-img' src="/assets/nodata.jpg" alt="no-data" />
    </div>
  )
}

export default NotFound