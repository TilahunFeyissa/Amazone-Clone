import React from 'react'
import { Link } from 'react-router-dom'
import './SingleThumbnail.css'

function SingleThumbnail({image,title}) {
  return (
    
    <div className="thumbnail">
      <Link to="/shopdress " className='shoplink'>
      <p className='title'>{title}</p>
      <img className='d-flex' src={image}></img>
       <p className='shop_now'>shop now</p>
       </Link>
    </div>
    
  )
}

export default SingleThumbnail