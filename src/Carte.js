// Carte.js
import React, { useState, useEffect, useRef } from 'react';
import './Carte.css';

function Carte({ rectoContent, versoContent, rectoImage, versoImage, retournable, onTurn, isTurnable, infoText, initialSide = "recto", isTurned, position }) {
    const [isRecto, setIsRecto] = useState(initialSide === "recto");
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
            }}
            draggable
            onClick={toggleSide}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
        >
            {isRecto ? (
                <div className="carte-verso">
                    {versoImage && <img src={versoImage} alt="Verso" className="carte-image" />}
                    <p>{versoContent}</p>
                </div>
            ) : (
                <div className="carte-recto">
                    <div className="info-icon">
                        ⓘ
                        <span className="tooltip">{infoText}</span>
                    </div>
                    {rectoImage && <img src={rectoImage} alt="Recto" className="carte-image"/>}
                    <p>{rectoContent}</p>
                </div>
            )}
        </div>
    );
}

export default Carte;
