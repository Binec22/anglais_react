// Carte.js
import React, { useState, useEffect, useRef } from 'react';
import './Carte.css';

function Carte({ rectoContent, versoContent, rectoImage, versoImage, retournable, onTurn, isTurnable, infoText, initialSide = "recto", isTurned, position, openModal}) {
    const [isRecto, setIsRecto] = useState(initialSide === "verso");
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isShaking, setIsShaking] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        if (isTurned !== undefined) {
            setIsRecto(!isTurned);
        }
    }, [isTurned]);

    const toggleSide = () => {
        if (retournable && isTurnable) {
            setIsRecto(!isRecto);
            onTurn();
        } else if (!isTurnable) {
            triggerShakeEffect();
        }
    };

    const triggerShakeEffect = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 300); // Arrête l'effet après 300ms
    };

    const handleDragStart = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        e.dataTransfer.setData('text/plain', '');
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDrag = (e) => {
        if (e.clientX === 0 && e.clientY === 0) return; // Empêcher des mises à jour invalides
        const newPosition = {
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        };
        // Met à jour la position de la carte
        cardRef.current.style.left = `${newPosition.x}px`;
        cardRef.current.style.top = `${newPosition.y}px`;
    };

    return (
        <div
            ref={cardRef}
            className={`carte ${isShaking ? 'carte-shake' : ''}`}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: 'grab',
                width: '320px', // Largeur ajustée pour accueillir les deux parties
                height: '200px', // Hauteur ajustée
            }}
            draggable
            onClick={toggleSide}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
        >
            {isRecto ? (
                <div className="carte-recto" style={{ display: 'flex' }}>
                    <div className="carte-image-container" style={{ flex: 1 }}>
                        {rectoImage && <img src={rectoImage} alt="Recto" className="carte-image"/>}
                    </div>
                    <div className="carte-text-container" style={{ flex: 1 }}>
                        <div className="info-icon" onClick={openModal}>
                            ⓘ
                            <span className="tooltip">{infoText}</span>
                        </div>
                        <h4>{rectoContent}</h4>
                        <div className="info-text">
                            <p>{infoText}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="carte-verso" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {versoImage && <img src={versoImage} alt="Verso" className="carte-image" />}
                    <p>{versoContent}</p>
                </div>
            )}
        </div>
    );
}

export default Carte;
