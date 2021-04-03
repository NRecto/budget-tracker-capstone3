import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

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
                
                    <a href=""> Profile </a>
                    <a href=""> Budget Plan </a>
                    <a href=""> Sign Out </a>
            </div>
        </Container>
        </React.Fragment>
    )
}