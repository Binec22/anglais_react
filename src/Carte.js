import React, { useState, useEffect } from 'react';
import './Carte.css';

function Carte({ rectoContent, versoContent, rectoImage, versoImage, retournable, onTurn, isTurnable, infoText, initialSide = "recto" }) {
    const [isRecto, setIsRecto] = useState(initialSide === "recto");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        const randomX = Math.floor(Math.random() * (window.innerWidth - 200)); // 200 est une largeur approximative de carte
        const randomY = Math.floor(Math.random() * (window.innerHeight - 300)); // 300 est une hauteur approximative de carte
        setPosition({ x: randomX, y: randomY });
    }, []);

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
        const rect = e.target.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        e.dataTransfer.setData('text/plain', '');
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDrag = (e) => {
        if (e.clientX === 0 && e.clientY === 0) return; // Empêcher des mises à jour invalides
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleDragEnd = (e) => {
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };



    return (
        <div
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
            onDragEnd={handleDragEnd}
        >
            {/* Card Content */}
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
