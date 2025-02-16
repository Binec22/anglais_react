// Timer.js
import React, { useEffect, useState } from 'react';
import './Timer.css'; // Assurez-vous d'importer le fichier CSS

const Timer = ({ onPenalty, onStop }) => {
    const [time, setTime] = useState(0);
    const [penaltyTriggered, setPenaltyTriggered] = useState(false);

    useEffect(() => {
        const timerId = setTimeout(() => setTime(time + 1), 1000);

        if (penaltyTriggered) {
            document.body.classList.add('penalty');
            setTimeout(() => {
                document.body.classList.remove('penalty');
                setPenaltyTriggered(false);
            }, 500);
        }

        return () => clearTimeout(timerId);
    }, [time, penaltyTriggered]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const applyPenalty = (additionalSeconds) => {
        setTime(time + additionalSeconds);
        setPenaltyTriggered(true);
        onPenalty && onPenalty(additionalSeconds);
    };

    const stopTimer = () => {
        onStop && onStop();
    };

    return (
        <div className="timer-box">
            <div className="timer-display">{formatTime(time)}</div>
        </div>
    );
};

export default Timer;
