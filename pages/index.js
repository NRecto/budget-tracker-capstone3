import React, { useContext } from 'react';
import UserContext from '../UserContext';
import Profile from '../components/Profile';
import Landing from '../components/Landing';




export default function Home() {

  const {user} = useContext(UserContext);
  
  return (
    <React.Fragment>
      {
        user.id !== null
        ? <Profile />
        : <Landing />
      }
      
 
    </React.Fragment>
  )
}
