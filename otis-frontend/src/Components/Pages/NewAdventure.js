import React, { useState} from 'react';
import {useHistory, Link} from "react-router-dom";
import axios from "axios";

import PageWrapper from "../PageWrapper";

export default function NewAdventure() {
    const [inputText, setInputText] = useState("");
    const [ableToContinue, setAbleToContinue] = useState();

    const history = useHistory();

    const createAdventure = () => {
        axios.post("http://172.29.1.1:5000/api/screen-main", {name: inputText});
    }

    const changeInputText = (value) => {
        setInputText(value);

        if (value) {
            setAbleToContinue(true);
        } else {
            setAbleToContinue(false);
        }
    }

    const checkEnter = (e) => {
        if (e.keyCode === 13) {
            createAdventure();
            history.push("/editor")
        }
    }

    return (
        <PageWrapper back={() => history.push("/")}>
            <div style={styles.container}>
                <p style={styles.mainText}>What is the title of your new adventure?</p>
                <input style={styles.input} autoFocus={true} onKeyDown={checkEnter} onChange={(e) => changeInputText(e.target.value)}/>
                <br/>
                {ableToContinue && <Link style={styles.link} to="/editor" onClick={createAdventure}>Continue</Link>}
            </div>
        </PageWrapper>
    )
}

const styles = {
    container: {
        margin: "auto",
        width: "800px",
        textAlign: "center",
    },
    mainText: {
        fontSize: "60px",
        marginBottom: "30px",
    },
    input: {
        border: "none",
        height: "50px",
        width: "400px",
        borderRadius: "10px",
        boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.3)",
        fontSize: "26px",
        textAlign: "center",
        marginBottom: "20px",
    },
    link: {
        color: "#424242",
        textDecoration: "none",
        fontSize: "24px",

    }
}