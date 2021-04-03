import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import React from 'react'
import SideNavBar from './components/SideNavbar'


function MyApp({ Component, pageProps }) {

  return (
  <> 
  <SideNavBar />
  <Component {...pageProps} />
  </>
  )
}

export default MyApp
