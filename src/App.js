
import './App.css';
import Header from './component/Header/Header';
import Home from './component/Home/Home';
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import Checkout from './component/Checkout/Checkout';
import LogIn from './component/LogIn/LogIn';
import { useStateValue } from './component/StateProvider/StateProvider';
import { useEffect } from 'react';
import Payment from './component/Payment/Payment';
import { auth } from './firebase';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './component/Orders/Orders';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Moreheadsets from './More/MoreHeadsets/Moreheadsets';

const promise = loadStripe('pk_test_51LJSLoIJ35zwzJ3gCXNLaXCa1r0S4GB3oeg6yjtBOjdMhC78FYFVj97a9gDMC8CkAj3ceQdnKTZwT6Yg5kzAfeXt00lPpV7KDB');



function App() {
  const[{},dispatch]=useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("THE USER IS >>> ", authUser);
      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/payment" element={
      <Elements stripe={promise}>
      <Header/>
      <Payment/> 
      </Elements>}>
        </Route>
    <Route path="/login" element={<><LogIn/> </>}>
        </Route>
        <Route path="/orders" element={<><Header/><Orders/> </>}>
        </Route>
    <Route path="/checkout" element={<><Header/> <Checkout/></>}>
    </Route>
    <Route path="/headsets" element={<><Header/> <Moreheadsets/></>}>
        </Route>
      <Route path="/" element={<><Header/> <Home/></>}>
      </Route>
      <Route path="*" element={<> <Header/><h2 className='centre'>This page is temporarily unavailable<br/><br/>for testing purpose only Headsets section(under Gaming and Accesories) and other links that have add to basket button are active<br/><br/>Go to <Link to="/">Home</Link> and use one or more of them</h2></>}>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
