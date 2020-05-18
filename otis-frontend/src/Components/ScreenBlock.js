import React, {useEffect, useState} from 'react';

import axios from "axios";

import deleteIcon from "../res/delete.svg";

export default function ScreenBlock(props) {
    const placeHolderLoading = {title: "Loading", text: "Loading", options: []}

    const [screen, setScreen] = useState(placeHolderLoading);
    const [isFetched, setIsFetched] = useState(false);

    const [titleToggled, setTitleToggled] = useState(false);
    const [titleInput, setTitleInput] = useState("");

    const [textToggled, setTextToggled] = useState(false);
    const [textInput, setTextInput] = useState("");

    const [optionToggled, setOptionToggled] = useState(null);
    const [optionInput, setOptionInput] = useState("");

    const getScreen = () => {
        axios.get(`http://172.29.1.1:5000/api/screen/${props.id}`).then((result) => {
            setIsFetched(true);
            setScreen(keepPlaceholders(result.data.output));
        });
    }

    useEffect(() => {
        if (!isFetched) getScreen();
    });
    
    const keepPlaceholders = (screen) => {
        if (!screen.title) screen.title = "No title";
        if (!screen.text) screen.text = "No text";
        return screen;
    }

    const update = (obj) => {
        const updatedScreen = {...screen, ...obj};
        setScreen(keepPlaceholders(updatedScreen));
        axios.put(`http://172.29.1.1:5000/api/screen/${props.id}`, updatedScreen);
    }
    

    const checkEnterTitle = (e) => {
        if (e.keyCode === 13) {
            setTitleToggled(false);
            update({title: titleInput});
        }
    }
    const checkEnterText = (e) => {
        if (e.keyCode === 13) {
            setTextToggled(false);
            update({text: textInput});
        }
    }
    const checkEnterOption = (e, index) => {
        if (e.keyCode === 13) {
            setOptionToggled(null);
            let tmpScreen = screen;
            tmpScreen.options[index].option_text = optionInput;
            update(tmpScreen);
        }
    }
    
    const createOption = () => {
        axios.post(`http://172.29.1.1:5000/api/screen`).then((result) => { // Create empty screen for option
            axios.post(`http://172.29.1.1:5000/api/option`, {screen_id: result.data.id}).then((result) => { // Creating option
                let tmpScreen = screen;
                tmpScreen.options.push({option_id: result.data.id, option_text: "No option text"});
                update(tmpScreen);
                setOptionToggled(screen.options.length-1);
            });
        })
    }
    const removeOption = (index) => {
        if (window.confirm("Are you sure you want to delete this option?")) {
            axios.delete(`http://172.29.1.1:5000/api/option/${screen.options[index].option_id}`).then(() => {
                let tmpScreen = screen;
                tmpScreen.options.splice(index, 1);
                update(tmpScreen);
            });

        }
    }

    const options = () => {
        return screen.options.map((option, index) => {
            return <div key={option.option_id} style={styles.option}>
                    
                    {!(optionToggled === index) &&
                        <div style={styles.optionTextContainer}>
                            <img alt="delete" src={deleteIcon} onClick={() => removeOption(index)} style={styles.deleteIcon} />
                            <p onClick={() => setOptionToggled(index)} style={styles.optionText}>
                                {(index+1).toString()+ ". " + option.option_text}</p>
                        </div>}
                    {(optionToggled === index) && <input style={styles.input} defaultValue={option.option_text} autoFocus
                        onKeyDown={(e) => checkEnterOption(e, index)} onChange={(e) => setOptionInput(e.target.value)}/>}
                </div>
        });
    }


    
    return (
        <div style={styles.container}>
            {props.main && <React.Fragment>
                {!titleToggled && <p style={styles.title} onClick={() => setTitleToggled(true)}>{screen.title}</p>}
                {titleToggled && <input style={styles.input} defaultValue={screen.title} onKeyDown={checkEnterTitle} onChange={(e) => setTitleInput(e.target.value)}/>}
            </React.Fragment>}
            
            {!textToggled && <p style={styles.text} onClick={() => setTextToggled(true)}>{screen.text}</p>}
            {textToggled && <textarea style={styles.input} defaultValue={screen.text} onKeyDown={checkEnterText} onChange={(e) => setTextInput(e.target.value)}/>}
        
            <p style={styles.optionsText}>Options:</p>

            {options()}
            <br/>
            <button style={styles.button} onClick={createOption}>New</button>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: "#D0D0D0",
        width: "300px",
        padding: "20px",
        borderRadius: "15px",
        border: "2px solid black",
        textAlign: "center",
    },
    title: {
        fontSize: "30px",
        cursor: "pointer",
        margin: "10px 0",
    },
    text: {
        fontSize: "18px",
        cursor: "pointer",

    },
    button: {
        color: "white",
        fontSize: "20px",
        padding: "3px 6px",
        backgroundColor: "#414141",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",

    },
    input: {
        border: "none",
        padding: "5px",
        borderRadius: "3px",
        margin: "5px",
    },
    optionsText: {
        fontSize: "22px",
        fontWeight: "800",
    },
    option: {
        width: "100%",
        margin: "5px",
        textAlign: "left",
    },
    optionTextContainer: {
        margin: "0",
        display: "flex",
    },
    optionText: {
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "3px",
        border: "solid #666666 2px",
        margin: "0 10px 0",
        paddingRight: "10px",
    },
    deleteIcon: {
        cursor: "pointer",
    }
}