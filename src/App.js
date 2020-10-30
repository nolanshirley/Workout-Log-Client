import './App.css';
import React, { useState, useEffect } from 'react'; 
import SiteBar from './Home/Navbar'; 
import Auth from './Auth/Auth'; 

function App() {
  const [sessionToken, setSessionToken] = useState(''); // since our sessionToken will change during the course of our app running( it will start empty, be given a value upon logging in, then emptied upon logout), setSessionToken allows us to change our 1st state variable

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken); 
    setSessionToken(newToken); // this allows child components to quickly access the sessionToken for use
    console.log(sessionToken); 
  }

  return (
    <div>
      <SiteBar />
      <Auth updateToken={updateToken}/>
    </div>
  );
}

export default App;
