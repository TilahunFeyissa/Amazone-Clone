import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { useState } from 'react'
import NumberFormat from 'react-number-format'
import { Link, useNavigate } from 'react-router-dom'
import CheckOutProduct from '../Checkout/CheckOutProduct'
import { useStateValue } from '../StateProvider/StateProvider'
import './Payment.css'
import axios from '../axios/axios'
import { useEffect } from 'react'
import { db } from '../../firebase'



function Payment() {
    const navigate= useNavigate()
    const [{basket, user}, dispatch]=useStateValue();
    const stripe=useStripe()
    const elements =useElements()

    const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');

    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
          const response = await axios({
            method: 'post',
            // Stripe expects the total in a currencies subunits
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
          });
          setClientSecret(response.data.clientSecret);
        };
    
        getClientSecret();
      }, [basket]);
    
      console.log('THE cli SECRET IS >>>', clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation


            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET',
              });

            navigate('/orders')
        });

    }
    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
      };


  return (
    <div>
        <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckOutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
          </div>
          <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}/>
                <div className="payment__priceContainer">
                    <NumberFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}/>
                     <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
                </div>
                {error && <div>{error}</div>}
            </form>
          </div>
          </div>

          </div>
    </div>
    
  )
}

export default Payment