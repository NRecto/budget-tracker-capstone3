import React, { useContext } from 'react';
import UserContext from '../UserContext';
import Landing from './components/Landing';
import Profile from './components/Profile';



export default function Home({data}) {
 console.log(data)
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

// export async function getServerSideProps() {
//   const res = await fetch(`http://localhost:4000/api/users/details-landing`)
//   const data = await res.json()

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }