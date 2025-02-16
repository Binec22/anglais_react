import React, { useState } from 'react';
import Carte from './Carte';
import './App.css';

function App() {
    // Mapping entre les cartes : chaque carte peut activer et/ou supprimer des cartes
    const cardMappings = {
        10: { activate: [46], remove: [], autoTurn: [] },
        36: { activate: [46], remove: [], autoTurn: [] },
        46: { activate: [16,17,41,42], remove: [10,36], autoTurn: [16,17,41,42] },
        16: { activate: [20], remove: [], autoTurn: [] },
        17: { activate: [22], remove: [], autoTurn: [] },
        42: { activate: [57], remove: [], autoTurn: [] },
        41: { activate: [4], remove: [], autoTurn: [] },
        22: { activate: [79], remove: [], autoTurn: [] },
        57: { activate: [], remove: [], autoTurn: [] },
        4: { activate: [], remove: [], autoTurn: [] },
        20: { activate: [], remove: [16,4], autoTurn: [] },
        79: { activate: [99], remove: [57,22], autoTurn: [] },
        99: { activate: [], remove: [79,20,40,42,17], autoTurn: [] },
    };

    const [activeCards, setActiveCards] = useState([10,36,46]); // La première carte est activable
    const [visibleCards, setVisibleCards] = useState([10,36,46,16,17,42,41,22,57,4,20,79,99]); // Toutes les cartes sont visibles au départ
    const [turnedCards, setTurnedCards] = useState([]); // État pour suivre les cartes retournées

    const handleCardTurn = (cardId) => {
        const { activate = [], remove = [], autoTurn = [] } = cardMappings[cardId] || {};

        // Mise à jour des cartes activables
        setActiveCards((prev) => [...new Set([...prev, ...activate])]);

        // Mise à jour des cartes visibles (suppression des cartes)
        setVisibleCards((prev) => prev.filter((id) => !remove.includes(id)));

        // Mise à jour des cartes retournées
        setTurnedCards((prev) => [...new Set([...prev, cardId, ...autoTurn])]);
    };

    return (
        <div className="App">
            <div className="rules-link">
                <a href="/images/anglais.pdf" target="_blank" rel="noopener noreferrer">
                    To know more...
                </a>
            </div>
            {visibleCards.includes(10) && (
                <Carte
                    rectoContent="Carte 10"
                    versoContent="Carte 10"
                    rectoImage="/images/10.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(10)}
                    isTurnable={activeCards.includes(10)}
                    infoText="Use this fire extinguisher to put out the fire"
                    initialSide="verso"
                    isTurned={turnedCards.includes(10)}
                />
            )}

            {visibleCards.includes(36) && (
                <Carte
                    rectoContent="Carte 36"
                    versoContent="Carte 36"
                    rectoImage="/images/36.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(36)}
                    isTurnable={activeCards.includes(36)}
                    infoText="Disaster! There's a fire in the engine. Find a way to extinguish it to access the control room."
                    initialSide="verso"
                    isTurned={turnedCards.includes(36)}
                />
            )}

            {visibleCards.includes(46) && (
                <Carte
                    rectoContent="Carte 46"
                    versoContent="Carte 46"
                    rectoImage="/images/46.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(46)}
                    isTurnable={activeCards.includes(46)}
                    infoText="The control room is ready. Look at everything in front of us!"
                    isTurned={turnedCards.includes(46)}
                />
            )}

            {visibleCards.includes(16) && (
                <Carte
                    rectoContent="Carte 16"
                    versoContent="Carte 16"
                    rectoImage="/images/16.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(16)}
                    isTurnable={activeCards.includes(16)}
                    infoText="Darn! The equipment storage is locked! Try to find the keys, they can't be far away."
                    isTurned={turnedCards.includes(16)}
                />
            )}

            {visibleCards.includes(17) && (
                <Carte
                    rectoContent="Carte 17"
                    versoContent="Carte 17"
                    rectoImage="/images/17.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(17)}
                    isTurnable={activeCards.includes(17)}
                    infoText="In the laboratory, you will read between the lines. Do not forget to equip yourself."
                    isTurned={turnedCards.includes(17)}
                />
            )}

            {visibleCards.includes(41) && (
                <Carte
                    rectoContent="Carte 41"
                    versoContent="Carte 41"
                    rectoImage="/images/41.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(41)}
                    isTurnable={activeCards.includes(41)}
                    infoText="If you want to get to the equipment room, you should take an interest in the safe."
                    isTurned={turnedCards.includes(41)}
                />
            )}

            {visibleCards.includes(42) && (
                <Carte
                    rectoContent="Carte 42"
                    versoContent="Carte 42"
                    rectoImage="/images/42.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(42)}
                    isTurnable={activeCards.includes(42)}
                    infoText="You should look through the porthole..."
                    isTurned={turnedCards.includes(42)}
                />
            )}

            {visibleCards.includes(22) && (
                <Carte
                    rectoContent="Carte 22"
                    versoContent="Carte 22"
                    rectoImage="/images/22.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(22)}
                    isTurnable={activeCards.includes(22)}
                    infoText="Mix the tubes until the chemistry takes effect"
                    isTurned={turnedCards.includes(22)}
                />
            )}

            {visibleCards.includes(57) && (
                <Carte
                    rectoContent="Carte 57"
                    versoContent="Carte 57"
                    rectoImage="/images/57.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(57)}
                    isTurnable={activeCards.includes(57)}
                    infoText="Use everything in your possession to kill this hideous marine creature"
                    isTurned={turnedCards.includes(57)}
                />
            )}

            {visibleCards.includes(4) && (
                <Carte
                    rectoContent="Carte 4"
                    versoContent="Carte 4"
                    rectoImage="/images/4.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(4)}
                    isTurnable={activeCards.includes(4)}
                    infoText="I hope you have found the key..."
                    isTurned={turnedCards.includes(4)}
                />
            )}

            {visibleCards.includes(20) && (
                <Carte
                    rectoContent="Carte 20"
                    versoContent="Carte 20"
                    rectoImage="/images/20.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(20)}
                    isTurnable={activeCards.includes(20)}
                    infoText="Here is your suit, make good use of it"
                    isTurned={turnedCards.includes(20)}
                />
            )}

            {visibleCards.includes(79) && (
                <Carte
                    rectoContent="Carte 79"
                    versoContent="Carte 79"
                    rectoImage="/images/79.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(79)}
                    isTurnable={activeCards.includes(79)}
                    infoText="Open your eyes wide, we can see something rather interesting"
                    isTurned={turnedCards.includes(79)}
                />
            )}

            {visibleCards.includes(99) && (
                <Carte
                    rectoContent="Carte 99"
                    versoContent="Carte 99"
                    rectoImage="/images/99.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(99)}
                    isTurnable={activeCards.includes(99)}
                    infoText="Here's the grand finale"
                    isTurned={turnedCards.includes(99)}
                />
            )}
        </div>
    );
}

export default App;
