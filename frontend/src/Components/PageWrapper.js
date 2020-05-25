import React from 'react'

import arrowIcon from "../res/arrow_back.svg";
import moonIcon from "../res/moon.svg";

export default function PageWrapper(props) {
    return (
        <div style={styles.container}>
            {props.back && <img alt="arrow back" src={arrowIcon} style={styles.backIcon} onClick={props.back}/>}
            <img alt="moon" src={moonIcon} style={styles.moonIcon}/>
            {props.children}
        </div>
    )
}

const styles = {
    backIcon: {
        position: "absolute",
        width: "75px",
        top: "0",
        cursor: "pointer",
    },
    moonIcon: {
        position: "absolute",
        right: 0,
        top: "10px",
        width: "75px",
        cursor: "pointer",
    },
    container: {
        padding: "20px",
        paddingTop: "110px",
    },
}