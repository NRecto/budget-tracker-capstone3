import { useContext, useEffect } from 'react';
import UserContext from '../../UserContext';
import Router from 'next/router';

export default function index() {

    const { unsetUser } = useContext( UserContext );

    useEffect( () => {
        unsetUser();
        Router.push('/')
    }, [] )
    
    return (
        null
    )
}