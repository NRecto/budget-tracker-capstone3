import React, { useContext } from 'react';
import UserContext from '../UserContext';





export default function Home() {

  const {user} = useContext(UserContext);
  
  return (
    <React.Fragment>
      {
        user.id !== null
        ? 
        : <
      }
      
      <Land
    </React.Fragment>
  )
}
