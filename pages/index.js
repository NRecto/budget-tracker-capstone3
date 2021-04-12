import React, { useContext } from 'react';
import UserContext from '../UserContext';
import Landing from '../components/Landing';


export default function Home() {

  const {user} = useContext(UserContext);
  
  return (
    <React.Fragment>
         <Landing />
    </React.Fragment>
  )
}
