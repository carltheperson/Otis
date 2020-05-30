import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";

import PageWrapper from "../PageWrapper";
import axios from 'axios';

import exportIcon from "../../res/export.svg";

export default function Export(props) {

    const exportOptions = [
        {
            displayName: "Batch (Windows)",
            file: "batch",
            fileEnding: ".bat",
        },
        {
            displayName: "Shell Script (Mac & Linux)",
            file: "shell_script",
            fileEnding: ".sh",
        }
    ]

    const history = useHistory();

    const [title, setTitle] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        axios.get(`http://172.29.1.1:5000/api/adventure/${props.match.params.id}`).then((result) => {
            setTitle(result.data.title);
        });
    }, [props.match.params.id]);

    const downloadFile = (source, fileName) => {
        const element = document.createElement("a");
        const file = new Blob([source], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
    }

    const displayExportOptions = () => {
        return exportOptions.map((option, index) => {

            const requestExport = () => {
                console.log(option)
                axios.get(`http://172.29.1.1:5000/api/export/${option.file}/${props.match.params.id}`).then((result) => {
                    downloadFile(result.data.exported_output, title.replace(/[^a-z0-9]/gi, '_') + option.fileEnding)
                }).catch((result) => {
                    setErrorMsg(result.data.errorMsg);
                });
            }

            return <div style={styles.optionContainer} key={index}>
                <img style={styles.exportIcon} alt="export icon" src={exportIcon} onClick={requestExport}/>
                <p>{option.displayName}</p>
                <p style={styles.fileText}>{option.fileEnding}</p>
            </div>
        });
    }

    return (
        <PageWrapper back={() => history.push("/your-adventures")}>
            <div style={styles.container}>
                <p style={styles.mainText}>How do you want to export '{title}'?</p>
                {errorMsg}
                {displayExportOptions()}
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
        marginBottom: "45px",
    },
    optionContainer: {
        width: "375px",
        backgroundColor: "lightgrey",
        display: "flex",
        margin: "auto",
        marginTop: "30px",
        padding: "10px",
        borderRadius: "10px",
        position: "relative",
        fontSize: "18px",
    },
    exportIcon: {
        marginRight: "15px",
        cursor: "pointer",
    },
    fileText: {
        marginLeft: "10px",
        color: "#666",
        fontWeight: "700",
    }
}