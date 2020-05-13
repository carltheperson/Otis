import React from 'react';
import {useHistory} from "react-router-dom";

import PageWrapper from "../PageWrapper";
import ScreenBlock from "../ScreenBlock";

export default function Editor(props) {
    const history = useHistory();
    
    const id = props.match.params.id;


    return (
        <PageWrapper back={() => history.push("/your-adventures")}>

            <ScreenBlock main={true} id={id}/>
            

            {/* 
            Example of how to organize the editor
            
            <div style={styles.boxContainer}>
                <div style={styles.box}></div>
                <div style={{border: "1px solid blue", display: "flex", alignItems: "center"}}>
                    <div style={{...styles.box, maxWidth: "50%"}}></div>
                    <div style={styles.boxContainer}>
                        <div style={styles.box}></div>
                        <div style={styles.box}></div>
                        <div>
                        <div style={{border: "1px solid blue", display: "flex", alignItems: "center"}}>
                            <div style={{...styles.box, maxWidth: "50%", height: "100px"}}></div>
                            <div style={styles.boxContainer}>
                                <div style={styles.box}></div>
                                <div style={styles.box}></div>
                                <div style={styles.box}></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={styles.box}></div>

            </div>
            */}
            
        </PageWrapper>
    )
}

const styles = {
    box: {
        border: "1px solid red",
        backgroundColor: "lightgreen",
        width: "50px",
        height: "50px",
        margin: "10px",
        marginLeft: "40px",
    },
    box2: {
        border: "1px solid red",
        backgroundColor: "lightgreen",
        width: "50px",
        height: "100px",
        margin: "10px",
    },
    boxContainer: {
        border: "1px solid red",
        display: "grid",

    }
}