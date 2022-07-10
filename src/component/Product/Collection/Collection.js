import React from 'react'
import { Link } from 'react-router-dom'
import './Collection.css'


function Collection({title, image1,image2, image3, image4, label1,label2,label3,label4, }) {
  return (
    
    <div className="collection">
    <p className="title" >{title}</p>
    <div className='d-flex coll-items'>
      <Link to={label1}>
        <div><img src={image1}/>
        <p>{label1}</p></div>
        </Link>
        <div><img src={image2}/>
        <p>{label2}</p></div>
    </div>
    <div className='d-flex coll-items' >
        <div><img src={image3}/>
        <p>{label3}</p></div>
        <div><img src={image4}/>
        <p>{label4}</p></div> 
    </div>
    <p className='see_more'>see more</p>
</div>
  )
}

export default Collection