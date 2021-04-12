import React from 'react';
import Profile from '../components/profile';

export default function index({user}) {
	console.log(user)
    return (
		<React.Fragment>
			<Profile />
		</React.Fragment>
    )
}

export async function getStaticPaths(){
	
	const res = await fetch('http://localhost:4000/api/users/details-landing')
    const data = await res.json();
	
	const paths = data.map( user => {
		return {
			params : {id : user._id}
		}
	})
	// console.log(paths)

	return { paths, fallback:false}


}

export async function getStaticProps({params}){

	const res = await fetch('http://localhost:4000/api/users/details-landing')

    const data = await res.json()
	
	const user = data.find( user => user._id === params.id)
	// console.log(user)
	return {
		props : {
			user
		}
	}
}

