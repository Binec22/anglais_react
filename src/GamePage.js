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
    const [turnedCards, setTurnedCards] = useState([46, 16, 17, 42, 41, 22, 57, 4, 20, 79, 99]);
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
                infoText: "A fire extinguisher to turn off the engine!",
                modalContentText: (
                    <div>
                        <h1>Scientific Explanations for Underwater Operations</h1>
                        <h2>1. Challenges of Using a Fire Extinguisher in a Submarine</h2>
                        <p>
                            Using a fire extinguisher in a submarine presents specific challenges due to its confined,
                            pressurized,
                            and self-contained environment. It is essential to understand these constraints to ensure
                            crew safety
                            and minimize secondary risks associated with fire suppression.
                        </p>
                        <h3>1.1 Limited Oxygen Supply</h3>
                        <p>
                            In a submarine, the atmosphere is strictly controlled to maintain an adequate oxygen level
                            for the crew.
                            Unlike a land-based building, where air can be freely renewed, a submarine has a limited air
                            volume
                            and a recycling system to manage it.
                        </p>
                        <p>
                            When a CO2 fire extinguisher is used, it releases a large amount of carbon dioxide,
                            replacing part of
                            the available oxygen. If multiple extinguishers are required to put out a fire, the oxygen
                            levels can
                            drop dangerously, leading to breathing difficulties or even crew asphyxiation.
                        </p>
                        <p>
                            Practical example: In the event of a fire in a submarine’s engine room, an inert gas
                            extinguisher is
                            preferable as it suppresses the fire without compromising breathable air quality. Crews are
                            trained
                            to efficiently ventilate the area after using the extinguisher.
                        </p>
                        <h3>Associated Physical Principle: Dalton’s Law and Partial Pressure of Gases</h3>
                        <p>
                            Dalton’s Law states that the total pressure of a gas mixture is the sum of the partial
                            pressures
                            of each individual gas. In a submarine, the air is primarily a mixture of oxygen and
                            nitrogen.
                            When a CO2 extinguisher is used, it releases carbon dioxide, which replaces part of the
                            oxygen,
                            reducing its partial pressure and making breathing more difficult.
                        </p>
                    </div>

                ),
            },
            36: {
                rectoContent: "Carte 36",
                versoContent: "Carte 36",
                rectoImage: "/images/36.webp",
                infoText: "Disaster! There's a fire in the engine. Find a way to extinguish it to access the control room.",
                modalContentText: (
                    <div>
                        <h1>Scientific Explanations for Underwater Operations</h1>
                        <h2>1. Dangers of an Engine Fire in a Submarine</h2>
                        <p>
                            A fire in a submarine's engine room is one of the most critical emergencies due to the
                            confined space,
                            limited oxygen supply, and complex machinery involved. The extreme conditions make fire
                            suppression
                            particularly challenging and require specific safety protocols to prevent catastrophic
                            failures.
                        </p>
                        <h3>1.1 Extreme Heat and Risk of Structural Damage</h3>
                        <p>
                            The engine room of a submarine contains high-temperature components and flammable
                            substances,
                            such as fuel and lubricants. If a fire breaks out, the heat can rapidly increase,
                            potentially
                            damaging critical systems, including electrical circuits, pressure hull integrity, and
                            propulsion mechanisms.
                        </p>
                        <p>
                            If the fire is not controlled quickly, the high temperatures can weaken the metal structure
                            of the submarine,
                            increasing the risk of pressure failure. This could lead to water intrusion, equipment
                            malfunctions, or
                            complete loss of propulsion, endangering the entire crew.
                        </p>
                        <p>
                            Practical example: If an engine component overheats due to friction or an oil leak, it can
                            ignite, spreading flames
                            to surrounding systems. Submariners are trained to use specialized fire suppression systems
                            that
                            rapidly cool the affected area without causing excessive thermal stress on the submarine's
                            hull.
                        </p>
                        <h3>Associated Physical Principle: Heat Transfer and Thermal Expansion</h3>
                        <p>
                            Heat transfer mechanisms, including conduction, convection, and radiation, play a crucial
                            role in how
                            fire spreads in a confined space like a submarine. Metal components conduct heat rapidly,
                            which can cause expansion and structural deformation. If critical parts expand unevenly,
                            they may crack
                            under pressure, leading to mechanical failures.
                        </p>
                        <p>
                            Understanding these principles allows engineers to design fire-resistant materials and
                            cooling
                            mechanisms that minimize the impact of high temperatures on submarine integrity.
                        </p>
                    </div>
                )
            },
            46: {
                rectoContent: "Carte 46",
                versoContent: "Carte 46",
                rectoImage: "/images/46.webp",
                infoText: "The control room is ready. Look at everything in front of us!",
                modalContentText: (<div>
                        <h1>Scientific Explanations for Underwater Operations</h1>
                        <h2>1. The Role and Challenges of the Submarine Control Room</h2>
                        <p>
                            The control room, often referred to as the command center, is the most critical space in a
                            submarine.
                            It houses the navigation, communication, and operational control systems that ensure the
                            submarine's
                            safety and mission success. Every maneuver, from depth adjustments to sonar tracking, is
                            coordinated
                            from this central hub.
                        </p>
                        <h3>1.1 Navigating in a Three-Dimensional Environment</h3>
                        <p>
                            Unlike surface vessels, submarines operate in a three-dimensional space, requiring precise
                            depth
                            and buoyancy control. The control room constantly monitors pressure changes and adjusts
                            ballast
                            tanks to maintain stability and maneuverability.
                        </p>
                        <p>
                            The crew relies on sonar technology rather than visual cues, as natural light does not
                            penetrate
                            deep underwater. Active sonar sends sound pulses that bounce off objects, while passive
                            sonar detects
                            sounds from external sources, such as other submarines or marine life.
                        </p>
                        <p>
                            Practical example: If a submarine needs to avoid an underwater obstacle, the control room
                            officers
                            analyze sonar data and adjust the trim and ballast tanks to safely change depth while
                            maintaining
                            stealth.
                        </p>
                        <h3>Associated Physical Principle: Hydrostatic Pressure and Buoyancy</h3>
                        <p>
                            Submarines operate under intense hydrostatic pressure, which increases with depth. The
                            balance
                            between gravitational force and buoyant force determines whether the submarine rises, sinks,
                            or
                            remains at a constant depth.
                        </p>
                        <p>
                            By controlling the amount of water in ballast tanks, the submarine adjusts its overall
                            density,
                            ensuring stability and precise maneuvering even in challenging underwater environments.
                        </p>
                    </div>
                )
            },
            16: {
                rectoContent: "Carte 16",
                versoContent: "Carte 16",
                rectoImage: "/images/16.webp",
                infoText: "Darn! The equipment storage is locked! Try to find the keys, they can't be far away.",
                modalContentText: (<div>
                        <h1>Scientific Explanations for Underwater Operations</h1>
                        <h2>1. The Role of the Equipment Room in a Submarine</h2>
                        <p>
                            The equipment room in a submarine houses various auxiliary systems essential for maintaining
                            onboard
                            operations. While not as critical as the control room or engine room, this space contains
                            electrical
                            systems, backup power supplies, and environmental control units that ensure the submarine
                            functions
                            smoothly during missions.
                        </p>
                        <h3>1.1 Power Management and Support Systems</h3>
                        <p>
                            The equipment room includes electrical converters, battery storage, and cooling systems that
                            regulate
                            temperature-sensitive machinery. These systems support the operation of sonar, navigation
                            instruments,
                            and life support mechanisms.
                        </p>
                        <p>
                            Some submarines also store emergency equipment here, such as compressed air systems used for
                            ballast
                            tank control, as well as redundant systems to handle failures in primary operations.
                        </p>
                        <p>
                            Practical example: If the main power supply encounters an issue, backup generators or
                            battery banks
                            in the equipment room can temporarily provide electricity to critical systems, preventing
                            sudden operational failure.
                        </p>
                        <h3>Associated Physical Principle: Energy Storage and Conversion</h3>
                        <p>
                            Submarines rely on various energy storage and conversion methods to ensure continuous
                            operation.
                            Batteries store electrical energy generated by onboard generators and supply power when the
                            submarine
                            is submerged for long periods.
                        </p>
                        <p>
                            Understanding these principles allows engineers to design efficient energy management
                            systems that
                            optimize power usage while maintaining the submarine’s stealth and endurance.
                        </p>
                    </div>
                )
            },
            17: {
                rectoContent: "Carte 17",
                versoContent: "Carte 17",
                rectoImage: "/images/17.webp",
                infoText: "In the laboratory, you will read between the lines. Do not forget to equip yourself.",
                modalContentText: (<div>
                        <h1>Scientific Explanations for Underwater Operations</h1>
                        <h2>1. The Role of the Equipment Room in a Submarine</h2>
                        <p>
                            The equipment room in a submarine houses various auxiliary systems essential for maintaining
                            onboard
                            operations. While not as critical as the control room or engine room, this space contains
                            electrical
                            systems, backup power supplies, and environmental control units that ensure the submarine
                            functions
                            smoothly during missions.
                        </p>
                        <h3>1.1 Power Management and Support Systems</h3>
                        <p>
                            The equipment room includes electrical converters, battery storage, and cooling systems that
                            regulate
                            temperature-sensitive machinery. These systems support the operation of sonar, navigation
                            instruments,
                            and life support mechanisms.
                        </p>
                        <p>
                            Some submarines also store emergency equipment here, such as compressed air systems used for
                            ballast
                            tank control, as well as redundant systems to handle failures in primary operations.
                        </p>
                        <p>
                            Practical example: If the main power supply encounters an issue, backup generators or
                            battery banks
                            in the equipment room can temporarily provide electricity to critical systems, preventing
                            sudden operational failure.
                        </p>
                        <h3>Associated Physical Principle: Energy Storage and Conversion</h3>
                        <p>
                            Submarines rely on various energy storage and conversion methods to ensure continuous
                            operation.
                            Batteries store electrical energy generated by onboard generators and supply power when the
                            submarine
                            is submerged for long periods.
                        </p>
                        <p>
                            Understanding these principles allows engineers to design efficient energy management
                            systems that
                            optimize power usage while maintaining the submarine’s stealth and endurance.
                        </p>
                    </div>
                )
            },
            41: {
                rectoContent: "Carte 41",
                versoContent: "Carte 41",
                rectoImage: "/images/41.webp",
                infoText: "If you want to get to the equipment room, you should take an interest in the safe.",
                modalContentText: ""
            },
            42: {
                rectoContent: "Carte 42",
                versoContent: "Carte 42",
                rectoImage: "/images/42.webp",
                infoText: "You should look through the porthole...",
                modalContentText: (<div>
                        <h1>Scientific Explanations for Underwater Operations</h1>
                        <h2>1. The Role of the Porthole in a Submarine</h2>
                        <p>
                            Unlike surface vessels, submarines typically do not have traditional **portholes** due to
                            the extreme
                            water pressure at depth. However, in some specialized submarines or research submersibles,
                            reinforced portholes made of thick acrylic or specialized glass allow for external
                            observation
                            while maintaining structural integrity.
                        </p>
                        <h3>1.1 Structural Challenges and Pressure Resistance</h3>
                        <p>
                            A porthole in a submarine must withstand immense hydrostatic pressure. To prevent failure,
                            it is
                            designed with a thick, convex shape that evenly distributes external forces, ensuring safety
                            at great depths.
                        </p>
                    </div>
                )
            },
            22: {
                rectoContent: "Carte 22",
                versoContent: "Carte 22",
                rectoImage: "/images/22.webp",
                infoText: "Mix the tubes until the chemistry takes effect",
                modalContentText: ""
            },
            57: {
                rectoContent: "Carte 57",
                versoContent: "Carte 57",
                rectoImage: "/images/57.webp",
                infoText: "Use everything in your possession to kill this hideous marine creature",
                modalContentText: ""
            },
            4: {
                rectoContent: "Carte 4",
                versoContent: "Carte 4",
                rectoImage: "/images/4.webp",
                infoText: "I hope you have found the key...",
                modalContentText: ""
            },
            20: {
                rectoContent: "Carte 20",
                versoContent: "Carte 20",
                rectoImage: "/images/20.webp",
                infoText: "Here is your suit, make good use of it",
                modalContentText: (<div>
                        <h1>Scientific Explanations for Underwater Operations</h1>
                        <h2>1. The Role of a Diving Suit in Underwater Operations</h2>
                        <p>
                            A **diving suit** is essential for underwater operations, providing thermal insulation,
                            buoyancy control, and protection against high water pressure. Depending on the depth and
                            mission,
                            divers use either wetsuits or specialized pressurized suits for deep-sea exploration.
                        </p>
                        <h3>1.1 Pressure Adaptation and Thermal Protection</h3>
                        <p>
                            At greater depths, water pressure increases significantly. Advanced diving suits, such as
                            atmospheric diving suits (ADS), are designed to maintain internal pressure while allowing
                            mobility. Additionally, thermal insulation materials prevent hypothermia in cold water
                            environments.
                        </p>
                    </div>
                )
            },
            79: {
                rectoContent: "Carte 79",
                versoContent: "Carte 79",
                rectoImage: "/images/79.webp",
                infoText: "Open your eyes wide, we can see something rather interesting",
                modalContentText: ""
            },
            99: {
                rectoContent: "Carte 99",
                versoContent: "Carte 99",
                rectoImage: "/images/99.webp",
                infoText: "Here's the grand finale",
                modalContentText: ""
            },
        };
        return cardInfo[cardId];
    };

    return (
        <div className="game-container">
            <Timer onPenalty={handlePenalty} onStop={handleStop} penaltySeconds={penaltySeconds}/>
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
