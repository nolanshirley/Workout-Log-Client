import './App.css';
import React, { useState, useEffect } from 'react'; 
import SiteBar from './Home/Navbar'; 
import Auth from './Auth/Auth'; 
import WorkoutIndex from './workouts/WorkoutIndex';

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

  const clearToken = () => {
    localStorage.clear(); 
    setSessionToken(''); 
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}/> : <Auth updateToken={updateToken}/>)
  }

  return (
    <div>
      <SiteBar clickLogout={clearToken}/> 
      {protectedViews()}
    </div>
  );
}

export default App;
