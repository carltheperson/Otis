import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import axios from "axios";

import PageWrapper from "../PageWrapper";

import AdventureCard from "../AdventureCard";

export default function YourAdventures() {
    const [cards, setCards] = useState([<p style={{fontSize: "30px"}} key={0}>Loading</p>]);

    const history = useHistory();

    useEffect(() => {
        getCards();
    });

    const getCards = () => {
        axios.get("http://172.29.1.1:5000/api/screen-main").then((result) => {
            setCards(result.data.map((screen, i) => {
                return <AdventureCard title={screen.title} id={screen.id} key={i}/>
            }));
        });
        
    }

    return (
        <PageWrapper back={() => history.push("/")}>
            <div style={styles.container}>
                <p style={styles.title}>Your adventures</p>
                <div style={styles.cardsContainer}>
                    {cards}
                </div>
            </div>
        </PageWrapper>
    )
}

const styles = {
    container: {
        padding: "0 150px",
    },
    cardsContainer: {
        marginLeft: "-30px",
    },
    title: {
        fontSize: "100px",
        margin: "0",
        marginBottom: "50px",

    },
}