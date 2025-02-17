// GamePage.js
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Carte from './Carte';
import './GamePage.css';
import Modal from "./Modal";

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
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const calculateCardPositions = (cardCount) => {
        const cardWidth = 300; // Largeur d'une carte
        const cardHeight = 200; // Hauteur d'une carte
        const screenWidth = window.innerWidth;

        const cardsPerRow = Math.floor(screenWidth / cardWidth / 1.3);
        const positions = [];

        for (let i = 0; i < cardCount; i++) {
            const row = Math.floor(i / cardsPerRow);
            const col = i % cardsPerRow;
            const x = 50 + col * (cardWidth + 150); // Espacement entre les cartes
            const y = 80 + row * (cardHeight + 50); // Espacement entre les lignes
            positions.push({ x, y });
        }

        return positions;
    };

    const getCardInfo = (cardId) => {
        const cardInfo = {
            10: {
                rectoContent: "Carte 10",
                versoContent: "Carte 10",
                rectoImage: "/images/10.webp",
                infoText: "Un extincteur pour éteindre le moteur !",
                modalContentText: (
                    <div>
                        <h1>Explications Scientifiques pour les Opérations Sous-Marines</h1>
                        <h2>1. Défis de l'Utilisation d'un Extincteur dans un Sous-Marin</h2>
                        <p>
                            L'utilisation d'un extincteur dans un sous-marin présente des défis spécifiques en raison de
                            l'environnement confiné, pressurisé et autonome. Il est essentiel de bien comprendre ces
                            contraintes afin d'assurer la sécurité de l'équipage et de minimiser les risques secondaires
                            liés à l'extinction d'un feu.
                        </p>
                        <h3>1.1 Approvisionnement Limité en Oxygène</h3>
                        <p>
                            Dans un sous-marin, l'atmosphère est strictement contrôlée pour assurer un niveau
                            d'oxygène adéquat à l'équipage. Contrairement à un bâtiment terrestre, où l'air peut être
                            renouvelé librement, un sous-marin dispose d'un volume d'air limité et d'un système de
                            recyclage de l'air.
                        </p>
                        <p>
                            Lorsqu'un extincteur à CO2 est utilisé, il libère une grande quantité de dioxyde de carbone,
                            qui remplace une partie de l’oxygène disponible. Si l'extinction d'un feu nécessite l'utilisation
                            de plusieurs extincteurs, cela peut faire chuter dangereusement le taux d'oxygène dans
                            l'atmosphère et entraîner des difficultés respiratoires, voire une asphyxie de l’équipage.
                        </p>
                        <p>
                            Exemple pratique : En cas d'incendie dans la salle des machines d'un sous-marin,
                            un extincteur à gaz inerte est préférable, car il éteint le feu sans compromettre la
                            qualité de l'air respirable. Les équipages sont formés pour ventiler efficacement la
                            zone après l'utilisation de l’extincteur.
                        </p>
                        <h3>Principe Physique Associé : Loi de Dalton et Pression Partielle des Gaz</h3>
                        <p>
                            La loi de Dalton stipule que la pression totale d’un mélange de gaz est la somme des
                            pressions partielles de chaque gaz individuel. Dans un sous-marin, l’air est un mélange
                            composé majoritairement d’oxygène et d’azote. Lorsqu’un extincteur à CO2 est utilisé, il
                            libère du dioxyde de carbone, qui remplace une partie de l’oxygène, diminuant ainsi la
                            pression partielle d’oxygène et rendant la respiration difficile.
                        </p>
                    </div>
                ),
            },
            36: { rectoContent: "Carte 36", versoContent: "Carte 36", rectoImage: "/images/36.webp", infoText: "Disaster! There's a fire in the engine. Find a way to extinguish it to access the control room.", modalContentText: "" },
            46: { rectoContent: "Carte 46", versoContent: "Carte 46", rectoImage: "/images/46.webp", infoText: "The control room is ready. Look at everything in front of us!", modalContentText: "" },
            16: { rectoContent: "Carte 16", versoContent: "Carte 16", rectoImage: "/images/16.webp", infoText: "Darn! The equipment storage is locked! Try to find the keys, they can't be far away.", modalContentText: "" },
            17: { rectoContent: "Carte 17", versoContent: "Carte 17", rectoImage: "/images/17.webp", infoText: "In the laboratory, you will read between the lines. Do not forget to equip yourself.", modalContentText: "" },
            41: { rectoContent: "Carte 41", versoContent: "Carte 41", rectoImage: "/images/41.webp", infoText: "If you want to get to the equipment room, you should take an interest in the safe.", modalContentText: "" },
            42: { rectoContent: "Carte 42", versoContent: "Carte 42", rectoImage: "/images/42.webp", infoText: "You should look through the porthole...", modalContentText: "" },
            22: { rectoContent: "Carte 22", versoContent: "Carte 22", rectoImage: "/images/22.webp", infoText: "Mix the tubes until the chemistry takes effect", modalContentText: "" },
            57: { rectoContent: "Carte 57", versoContent: "Carte 57", rectoImage: "/images/57.webp", infoText: "Use everything in your possession to kill this hideous marine creature", modalContentText: "" },
            4: { rectoContent: "Carte 4", versoContent: "Carte 4", rectoImage: "/images/4.webp", infoText: "I hope you have found the key...", modalContentText: "" },
            20: { rectoContent: "Carte 20", versoContent: "Carte 20", rectoImage: "/images/20.webp", infoText: "Here is your suit, make good use of it", modalContentText: "" },
            79: { rectoContent: "Carte 79", versoContent: "Carte 79", rectoImage: "/images/79.webp", infoText: "Open your eyes wide, we can see something rather interesting", modalContentText: "" },
            99: { rectoContent: "Carte 99", versoContent: "Carte 99", rectoImage: "/images/99.webp", infoText: "Here's the grand finale", modalContentText: "" },
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
                    const { rectoContent, versoContent, rectoImage, infoText, modalContentText } = getCardInfo(cardId);
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
                                openModal={() => openModal(modalContentText)}
                            />
                        )
                    );
                })}
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
            {gameEnded && <h2>Congratulations! You've completed the game!</h2>}
        </div>
    );
};

export default GamePage;
