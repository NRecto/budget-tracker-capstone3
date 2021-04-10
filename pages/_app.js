import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import React, { useState, useEffect } from 'react';
import SideNavBar from './components/SideNavbar';
import { UserProvider } from '../UserContext';


function MyApp({ Component, pageProps }) {

  const [user , setUser] = useState({ 
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      id: null,
      isAdmin: null
    })
  }

  useEffect( () => {
    setUser({
      id: localStorage.getItem('id'),
      isAdmin: localStorage.getItem('isAdmin') === 'true'
    })
  }, [])

  return (
  <React.Fragment> 
    <UserProvider value={ { user, setUser, unsetUser} } >
      <SideNavBar />
        <Component {...pageProps} />
    </UserProvider>
  </React.Fragment>
  )
}

export default MyApp
