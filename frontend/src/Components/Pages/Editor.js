import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";

import axios from 'axios';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/webpack-resolver";

import PageWrapper from "../PageWrapper";

import saveIcon from "../../res/save.svg";
import exportIcon from "../../res/export.svg";

export default function AdventureEditor(props) {
    const history = useHistory();

    const [isFetched, setIsFetched] = useState(false);
    const [source, setSource] = useState("");

    useEffect(() => {
        if (!isFetched) getAdventure();
    });

    const getAdventure = () => {
        axios.get(`http://172.29.1.1:5000/api/adventure/${props.match.params.id}`).then((result) => {
            setIsFetched(true);
            setSource(result.data.source);
        });
    }

    const save = (source) => {
        axios.put(`http://172.29.1.1:5000/api/adventure/${props.match.params.id}`, {source: source});
    }
    
    return (
        <PageWrapper back={() => history.push("/your-adventures")}>

            <img style={styles.icon} alt="save icon" src={saveIcon} onClick={() => save(source)}/>
            <img style={styles.icon} alt="export icon" src={exportIcon} onClick={() => history.push("/export/"+props.match.params.id)}/>


            <AceEditor
                mode="json"
                theme="github"
                value={source}
                onChange={newValue => setSource(newValue)}
                style={styles.editor}
                setOptions={{
                    fontSize: 18,
                    showPrintMargin: false,
                    useWorker: false,
                    
                }}
                commands={[{
                    name: 'saveFile',
                    bindKey: {
                        win: 'Ctrl-S',
                        mac: 'Command-S',
                    },
                    exec: ((env) => {save(env.getValue())}),
                }]}
                />

        </PageWrapper>
    )
}

const styles = {
    editor: {
        width: "",
        height: "85vh",
        border: "3px lightgrey solid",
        willChange: "transform",
    },
    icon: {
        width: "50px",
        cursor: "pointer",
    }
}
