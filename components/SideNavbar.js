import React, { useContext, useState } from 'react';
import styles from '../styles/Home.module.css';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import Link  from 'next/link';
// import Router from 'next/router';
import UserContext from '../UserContext';

export default function SideNavBar() {

    const {user} =useContext(UserContext);
    // console.log(user)
    const [wid, setWid] = useState('0%');

    function openSideNav(){
      setWid('25%')
    }
    function closeSideNav(){
        setWid('0%')
    };
    return (
        <React.Fragment>
        <div className={styles.topNav}>
            <a onClick={openSideNav} className={styles.openSide}>
                <FontAwesomeIcon icon={faBars} className={styles.faBars}/>
            </a>
        </div>
        <Container>
            <div className={styles.sideNav} style={{width: wid}}>
                <a onClick={closeSideNav} className={styles.closeSide}>
                    <FontAwesomeIcon icon={faTimes} />
                </a>

                {
                    user.id === null
                    ?   <Link href="/">
                            <a onClick={closeSideNav}> Home </a>
                        </Link>
                    :   <React.Fragment>
                            <Link href={{
                            pathname: '/user/[id]',
                            query: { id: user.id},
                        }} >
                                <a onClick={closeSideNav}> Home </a>
                            </Link>
                            <Link href="/categories">
                                <a onClick={closeSideNav}> Categories </a>
                            </Link>
                            <Link href="/user/transaction">
                                <a onClick={closeSideNav}> Transaction History </a>
                            </Link>
                            <Link href="/user/charts/monthly-expense">
                                <a onClick={closeSideNav}> Monthly Expense </a>
                            </Link>
                            <Link href="/user/charts/monthly-income">
                                <a onClick={closeSideNav}> Monthly Income </a>
                            </Link>
                            <Link href="/user/charts/balance-trend">
                                <a onClick={closeSideNav}> Trend </a>
                            </Link>
                            <Link href="">
                                <a onClick={closeSideNav}> Breakdown </a>
                            </Link>
                            <Link href="/logout">
                                <a onClick={closeSideNav}> Sign Out </a>
                            </Link>
                        </React.Fragment>
                }
                    
            </div>
        </Container>
        </React.Fragment>
    )
}