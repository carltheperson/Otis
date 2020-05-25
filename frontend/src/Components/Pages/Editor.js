import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

import PageWrapper from "../PageWrapper";


export default function AdventureEditor(props) {
    const history = useHistory();

    const [code, setCode] = useState("");

    
    return (
        <PageWrapper back={() => history.push("/your-adventures")}>

        <AceEditor
            mode="json"
            theme="github"
            value={code}
            onChange={newValue => setCode(newValue)}
            style={styles.editor}
            setOptions={{
                fontSize: 18,
                showPrintMargin: false,
            }}/>

        </PageWrapper>
    )
}

const styles = {
    editor: {
        width: "",
        height: "85vh",
        fontSize: "180px",
    },
}
