import React, { useState} from 'react';

export default function Terminal(props) {
    const displayOptionMenu = () => {
        let text = props.children + "\n ";
        props.options.forEach(option => {
            const keys = Object.keys(option);
            text += keys[0] + ". " + option[keys[0]] + "\n"
        });
        const options = (text).split("\n").map((item, i) => {
            if (i === 0) return <p className="title" key={i}>{item}</p>;
            return <p key={i}>{item}</p>;
            });
        return <div>{options}<br/></div>
    }
    const [text, setText] = useState(displayOptionMenu());
    const [inputText, setInputText] = useState();

    const proccesInput = (input) => {
        const checkForEasterEggs = () => {
            if (inputText === "pwd") return "/var/otis/"
            if (inputText === "ls") return "secret.txt";
            if (inputText === "cat secret.txt") return "It's impossible to hum while you hold your nose.";
            return false;
        }

        let foundCommand;
        props.options.forEach(option => {
            const keys = Object.keys(option);
            if (keys[0] === input) {
                foundCommand = true;
                option.func();
            }
        });
        if (!foundCommand) {
            const easterEgg = checkForEasterEggs();
            if (easterEgg) return easterEgg;
            return "Unknown command";
        } else {
            return "";
        }
    }
    
    const inputRef = React.useRef();
    const checkInput = (e) => {
        const output = proccesInput(inputText)
        if (e.keyCode === 13) {
            setText(<React.Fragment>{text}<p>$ {inputText}</p><p>{output}</p></React.Fragment>);
            inputRef.current.value = "";
            setInputText("");
        }
    }
    
    const windowStyle = {...styles.terminalWindow, ...{
        width: props.width,
        height: props.height}};
    return (
        <div className="terminal" style={windowStyle} onClick={() => inputRef.current.focus()}>
            {text}
            $ <input style={styles.input} autoFocus={true} onKeyDown={checkInput}
            ref={inputRef} onChange={(e) => setInputText(e.target.value)}/>
        </div>
    )
}

const styles = {
    terminalWindow: {
        backgroundColor: "black",
        color: "#04D600",
        padding: "20px",
        borderRadius: "20px",
        fontSize: "20px",
        maxHeight: "500px",
        overflowY: "auto",
        boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.75)",
    },
    input: {
        color: "#04D600",
        backgroundColor: "black",
        border: "none",
        width:"calc(100% - 75px)",
        fontSize: "20px",
    }
}