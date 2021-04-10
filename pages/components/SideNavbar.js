import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import Link  from 'next/link';

export default function SideNavBar() {

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
                <FontAwesomeIcon icon={faBars} />
            </a>
        </div>
        <Container>
            <div className={styles.sideNav} style={{width: wid}}>
                <a onClick={closeSideNav} className={styles.closeSide}>
                    <FontAwesomeIcon icon={faTimes} />
                </a>

                <Link href="/categories">
                    <a onClick={closeSideNav}> Categories </a>
                </Link>
                <Link href="/transaction">
                    <a onClick={closeSideNav}> Transaction History </a>
                </Link>
                <Link href="">
                    <a href=""> Monthly Expense </a>
                </Link>
                <Link href="">
                    <a href=""> Monthly Income </a>
                </Link>
                <Link href="">
                    <a href=""> Trend </a>
                </Link>
                <Link href="">
                    <a href=""> Breakdown </a>
                </Link>
                <Link href="/logout">
                    <a > Sign Out </a>
                </Link>
                    
            </div>
        </Container>
        </React.Fragment>
    )
}