import React from 'react'
import { useStateValue } from '../component/StateProvider/StateProvider';
import './More.css'

function More({image,title,price,rating,id}) {
    const[{basket}, dispatch]=useStateValue();
    const addToBasket =()=>{
        dispatch({
          type:'ADD_TO_BASKET',
          item:{
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
          }
        })}
  return (
    
<div className="more">
    <div className='left'>
    <img className="more__image" src={image} />
    </div>
    <div className='right'>
    <div className="more__info">
      <p className="more__title">{title}</p>
      <p className="more__price">
        <small>$</small>
        <strong>{price}</strong></p>
      
      <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟🌟🌟🌟🌟</p>
            ))}
        </div>
        <button onClick={addToBasket}>Add to Basket</button>
        </div>
      </div>
    </div> 
  )
}

export default More