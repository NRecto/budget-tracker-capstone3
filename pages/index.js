import React, { useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import Landing from '../components/Landing';
import Router from 'next/router';



export default function Home() {

  const {user} = useContext(UserContext);
  function redirectUser(){
      Router.push({
      pathname: '/user/[id]',
      query: { id: user.id }
    })
  }
  
  return (
    <React.Fragment>
        {
          user.id
          ? redirectUser()
          : <Landing />
        }
    </React.Fragment>
  )
}
