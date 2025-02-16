// GamePage.js
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Carte from './Carte';
import './GamePage.css';

const GamePage = () => {
    const cardMappings = {
        10: { activate: [46], remove: [], autoTurn: [] },
        36: { activate: [46], remove: [], autoTurn: [] },
        46: { activate: [16, 17, 41, 42], remove: [10, 36], autoTurn: [16, 17, 41, 42] },
        16: { activate: [20], remove: [], autoTurn: [] },
        17: { activate: [22], remove: [], autoTurn: [] },
        42: { activate: [57], remove: [], autoTurn: [] },
        41: { activate: [4], remove: [], autoTurn: [] },
        22: { activate: [79], remove: [], autoTurn: [] },
        57: { activate: [], remove: [], autoTurn: [] },
        4: { activate: [], remove: [], autoTurn: [] },
        20: { activate: [], remove: [16, 4], autoTurn: [] },
        79: { activate: [99], remove: [57, 22], autoTurn: [] },
        99: { activate: [], remove: [79, 20, 40, 42, 17, 46, 41], autoTurn: [] },
    };

    const [activeCards, setActiveCards] = useState([10, 36, 46]);
    const [visibleCards, setVisibleCards] = useState([10, 36, 46, 16, 17, 42, 41, 22, 57, 4, 20, 79, 99]);
    const [turnedCards, setTurnedCards] = useState([10, 36]);
    const [gameEnded, setGameEnded] = useState(false);
    const [cardPositions, setCardPositions] = useState([]);
    const [penaltySeconds, setPenaltySeconds] = useState(0);

    useEffect(() => {
        setCardPositions(calculateCardPositions(visibleCards.length));
    }, [visibleCards]);

    const handleCardTurn = (cardId) => {
        if (!activeCards.includes(cardId)) {
            addPenalty(60); // Ajoute une pénalité de 1 seconde
            return;
        }

        const { activate = [], remove = [], autoTurn = [] } = cardMappings[cardId] || {};

        setActiveCards((prev) => [...new Set([...prev, ...activate])]);
        setVisibleCards((prev) => prev.filter((id) => !remove.includes(id)));
        setTurnedCards((prev) => [...new Set([...prev, cardId, ...autoTurn])]);
    };

    const addPenalty = (seconds) => {
        setPenaltySeconds((prev) => prev + seconds);
    };

    const handlePenalty = (additionalSeconds) => {
        console.log(`Penalty applied: +${additionalSeconds} seconds`);
    };

    const handleStop = () => {
        setGameEnded(true);
        console.log('Game ended. Timer stopped.');
    };

    const calculateCardPositions = (cardCount) => {
        const cardWidth = 150; // Largeur d'une carte
        const cardHeight = 200; // Hauteur d'une carte
        const screenWidth = window.innerWidth;

        const cardsPerRow = Math.floor(screenWidth / cardWidth / 1.3);
        const positions = [];

        for (let i = 0; i < cardCount; i++) {
            const row = Math.floor(i / cardsPerRow);
            const col = i % cardsPerRow;
            const x = 50 + col * (cardWidth + 30); // Espacement entre les cartes
            const y = 80 + row * (cardHeight + 50); // Espacement entre les lignes
            positions.push({ x, y });
        }

        return positions;
    };

    const getCardInfo = (cardId) => {
        const cardInfo = {
            10: { rectoContent: "Carte 10", versoContent: "Carte 10", rectoImage: "/images/10.webp", infoText: "Use this fire extinguisher to put out the fire" },
            36: { rectoContent: "Carte 36", versoContent: "Carte 36", rectoImage: "/images/36.webp", infoText: "Disaster! There's a fire in the engine. Find a way to extinguish it to access the control room." },
            46: { rectoContent: "Carte 46", versoContent: "Carte 46", rectoImage: "/images/46.webp", infoText: "The control room is ready. Look at everything in front of us!" },
            16: { rectoContent: "Carte 16", versoContent: "Carte 16", rectoImage: "/images/16.webp", infoText: "Darn! The equipment storage is locked! Try to find the keys, they can't be far away." },
            17: { rectoContent: "Carte 17", versoContent: "Carte 17", rectoImage: "/images/17.webp", infoText: "In the laboratory, you will read between the lines. Do not forget to equip yourself." },
            41: { rectoContent: "Carte 41", versoContent: "Carte 41", rectoImage: "/images/41.webp", infoText: "If you want to get to the equipment room, you should take an interest in the safe." },
            42: { rectoContent: "Carte 42", versoContent: "Carte 42", rectoImage: "/images/42.webp", infoText: "You should look through the porthole..." },
            22: { rectoContent: "Carte 22", versoContent: "Carte 22", rectoImage: "/images/22.webp", infoText: "Mix the tubes until the chemistry takes effect" },
            57: { rectoContent: "Carte 57", versoContent: "Carte 57", rectoImage: "/images/57.webp", infoText: "Use everything in your possession to kill this hideous marine creature" },
            4: { rectoContent: "Carte 4", versoContent: "Carte 4", rectoImage: "/images/4.webp", infoText: "I hope you have found the key..." },
            20: { rectoContent: "Carte 20", versoContent: "Carte 20", rectoImage: "/images/20.webp", infoText: "Here is your suit, make good use of it" },
            79: { rectoContent: "Carte 79", versoContent: "Carte 79", rectoImage: "/images/79.webp", infoText: "Open your eyes wide, we can see something rather interesting" },
            99: { rectoContent: "Carte 99", versoContent: "Carte 99", rectoImage: "/images/99.webp", infoText: "Here's the grand finale" },
        };
        return cardInfo[cardId];
    };

    return (
        <div className="game-container">
            <Timer onPenalty={handlePenalty} onStop={handleStop} penaltySeconds={penaltySeconds} />
            <div className="rules-link">
                <a href="/images/anglais.pdf" target="_blank" rel="noopener noreferrer">
                    To know more...
                </a>
            </div>
            <div className="content-game-wrapper">
                {visibleCards.map((cardId, index) => {
                    const { rectoContent, versoContent, rectoImage, infoText } = getCardInfo(cardId);
                    return (
                        cardPositions[index] && ( // Vérifiez que la position existe
                            <Carte
                                key={cardId}
                                rectoContent={rectoContent}
                                versoContent={versoContent}
                                rectoImage={rectoImage}
                                versoImage="/images/back.webp"
                                retournable={true}
                                onTurn={() => handleCardTurn(cardId)}
                                isTurnable={activeCards.includes(cardId)}
                                infoText={infoText}
                                initialSide="verso"
                                isTurned={turnedCards.includes(cardId)}
                                position={cardPositions[index]}
                            />
                        )
                    );
                })}
            </div>
            {gameEnded && <h2>Congratulations! You've completed the game!</h2>}
        </div>
    );
};

export default GamePage;
