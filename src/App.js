import React, { useState } from 'react';
import Carte from './Carte';
import './App.css';

function App() {
    // Mapping entre les cartes : chaque carte peut activer et/ou supprimer des cartes
    const cardMappings = {
        10: { activate: [46], remove: [] },
        36: { activate: [46], remove: [] },
        46: { activate: [16,17,41,42], remove: [10,36] },
        16: { activate: [20], remove: [] },
        17: { activate: [22], remove: [] },
        42: { activate: [57], remove: [] },
        41: { activate: [4], remove: [] },
        22: { activate: [79], remove: [] },
        57: { activate: [], remove: [] },
        4: { activate: [], remove: [] },
        20: { activate: [], remove: [16,4] },
        79: { activate: [99], remove: [57,22] },
        99: { activate: [], remove: [79,20,40,42,17] },
    };

    const [activeCards, setActiveCards] = useState([10,36,46]); // La première carte est activable
    const [visibleCards, setVisibleCards] = useState([10,36,46,16,17,42,41,22,57,4,20,79,99]); // Toutes les cartes sont visibles au départ

    const handleCardTurn = (cardId) => {
        const { activate = [], remove = [] } = cardMappings[cardId] || {};

        // Mise à jour des cartes activables
        setActiveCards((prev) => [...new Set([...prev, ...activate])]);

        // Mise à jour des cartes visibles (suppression des cartes)
        setVisibleCards((prev) => prev.filter((id) => !remove.includes(id)));
    };

    return (
        <div className="App">
            {visibleCards.includes(10) && (
                <Carte
                    rectoContent="Carte 10"
                    versoContent="Carte 10"
                    rectoImage="/images/10.webp"
                    versoImage="/images/back.webp"
                    retournable={true}
                    onTurn={() => handleCardTurn(10)}
                    isTurnable={activeCards.includes(10)}
                    infoText=""
                    initialSide="verso"
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
                    infoText=""
                    initialSide="verso"
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
                    infoText=""
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
                    infoText=""
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
                    infoText=""
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
                    infoText=""
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
                    infoText=""
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
                    infoText=""
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
                    infoText=""
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
                    infoText=""
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
                    infoText=""
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
                    infoText=""
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
                    infoText=""
                />
            )}
        </div>
    );
}

export default App;
