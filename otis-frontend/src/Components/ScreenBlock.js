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
        axios.post(`http://172.29.1.1:5000/api/option`, {screen_id: props.id}).then((result) => {
            let tmpScreen = screen;
            tmpScreen.options.push({option_id: result.data.id, option_text: "No option text"});
            update(tmpScreen);
            setOptionToggled(screen.options.length-1);
        });
    }
    const removeOption = (index) => {
        if (window.confirm("Are you sure you want to delete this option?")) {
            let tmpScreen = screen;
            tmpScreen.options.splice(index, 1);
            update(tmpScreen);
        }
    }

    const options = () => {
        return screen.options.map((option, index) => {
            return <React.Fragment key={option.option_id}>
                    <img alt="delete" src={deleteIcon} onClick={() => removeOption(index)} />
                    {!(optionToggled === index) && <p onClick={() => setOptionToggled(index)}>{(index+1).toString()+ ". " + option.option_text}</p>}
                    {(optionToggled === index) && <input placeholder={option.option_text} autoFocus
                    onKeyDown={(e) => checkEnterOption(e, index)} onChange={(e) => setOptionInput(e.target.value)}/>}
                </React.Fragment>
        });
    }


    
    return (
        <div style={styles.container}>
            {props.main && <React.Fragment>
                {!titleToggled && <p style={styles.title} onClick={() => setTitleToggled(true)}>{screen.title}</p>}
                {titleToggled && <input placeholder={screen.title} onKeyDown={checkEnterTitle} onChange={(e) => setTitleInput(e.target.value)}/>}
            </React.Fragment>}
            
            {!textToggled && <p style={styles.text} onClick={() => setTextToggled(true)}>{screen.text}</p>}
            {textToggled && <input placeholder={screen.text} onKeyDown={checkEnterText} onChange={(e) => setTextInput(e.target.value)}/>}
        
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
    optionsText: {
        fontSize: "22px",
        fontWeight: "800",
    }
}