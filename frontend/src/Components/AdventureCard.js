import React from 'react';
import {useHistory} from "react-router-dom";

import exportIcon from "../res/export.svg";
import editIcon from "../res/edit.svg";

export default function AdventureCard(props) {
    
    const history = useHistory();
    
    return (
        <div style={styles.card}>
            <p style={styles.title}>{props.title}</p>
            <img alt="export" src={exportIcon} onClick={() => history.push(`/export/${props.id}`)}
                style={{...styles.icon, ...{left: "60px"}}}/>
            <img alt="edit" src={editIcon} onClick={() => history.push(`/edit/${props.id}`)}
                style={{...styles.icon, ...{right: "60px"}}}/>
        </div>
    )
}

const styles = {
    card: {
        width: "300px",
        height: "225px",
        backgroundColor: "white",
        borderRadius: "25px",
        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.3)",
        padding: "10px",
        paddingTop: "20px",
        position: "relative",
        margin: "0 0 35px 30px",
        float: "left",
    },
    title: {
        fontSize: "34px",
        textAlign: "center",
        margin: "5px 0",
    },
    icon: {
        cursor: "pointer",
        position: "absolute",
        bottom: "40px",
    },
}