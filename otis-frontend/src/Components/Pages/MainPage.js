import React from 'react'
import {useHistory} from "react-router-dom";

import PageWrapper from "../PageWrapper";
import Terminal from "../Terminal";

import Crow from "../../res/crow.png";

export default function MainPage() {
    const history = useHistory();

    return (
        <PageWrapper>
            <div style={styles.conatiner}>
                <div style={styles.textContainer}>
                    <h1 style={styles.title} >Otis</h1>
                    <p style={styles.text}>A text adventure creater that exports to native shell scripts</p>
                </div>

                <img alt="Crow" src={Crow} style={styles.crow}/>
                <Terminal width="50%" height="500px" options={
                    [{1: "Create a new adventure", func:() => history.push("/new-adventure")},
                    {2: "Work on an existing adventure", func:() => history.push("/your-adventures")},
                    {3: "About Otis", func:() => history.push("/about")}]}>
                To continue, select from the menu:
                </Terminal>
            </div>
        </PageWrapper>
    )
}

const styles = {
    conatiner: {
        paddingLeft: "25px",
    },
    title: {
        fontFamily: "'Milonga', cursive",
        marginTop: "-45px",
        marginBottom: "0",
        fontSize: "144px",
        fontWeight: "200",
    },
    text: {
        fontSize: "35px",
        margin: "0 0 25px 0"
    },
    textContainer: {
        width: "40%",
    },
    crow: {
        position: "absolute",
        width: "250px",
        marginTop: "-150px",
        left: "calc(50% - 150px)",
    },
}