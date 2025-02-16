// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/game');
    };

    return (
        <div className="home-container">
            <h1>Abyssal Mission</h1>
            <div className="rules">
                <h2>Game Rules</h2>
                <p><strong>Introduction:</strong> Welcome to <strong>Abyssal Mission</strong>, an exciting adventure where you must repair a distressed submarine and dive into the ocean depths to accomplish a crucial mission: cut underwater fiber optic cables. Prepare to face challenges and solve puzzles to achieve your goal!</p>
                <p><strong>Objective:</strong> Your mission is to repair the submarine and descend to the ocean depths to cut the underwater fiber optic cables. You will need to overcome various obstacles and solve puzzles throughout your adventure.</p>
                <p><strong>Preparation:</strong></p>
                <ul>
                    <li><strong>Team:</strong> Play solo or in a team. Collaboration and communication are essential to overcome challenges.</li>
                    <li><strong>Material:</strong> A computer or tablet with an internet connection, and optionally paper and a pencil for taking notes.</li>
                </ul>
                <p><strong>Gameplay:</strong></p>
                <ol>
                    <li><strong>Connection:</strong> Log in to the website and start the <strong>Abyssal Mission</strong> adventure.</li>
                    <li><strong>Time Limit:</strong> You have a limited time (usually 60 minutes) to complete your mission.</li>
                    <li><strong>Puzzles and Challenges:</strong> Solve puzzles, find hidden objects, and overcome obstacles to progress in the adventure.</li>
                    <li><strong>Explanatory Document:</strong> A document is available throughout the adventure to provide additional information about the challenges and obstacles you encounter.</li>
                    <li><strong>Hints:</strong> If you get stuck, you can ask for hints. Use them wisely, as they may affect your final score.</li>
                    <li><strong>Validation:</strong> Enter your answers in the provided fields. If the answer is correct, you will proceed to the next step.</li>
                </ol>
                <p><strong>End of Game:</strong></p>
                <ul>
                    <li><strong>Victory:</strong> You win if you manage to repair the submarine, reach the ocean depths, and cut the fiber optic cables before the time runs out.</li>
                    <li><strong>Defeat:</strong> If time runs out before you complete your mission, you lose. You can always try again to improve your performance!</li>
                </ul>
                <p><strong>Tips:</strong></p>
                <ul>
                    <li><strong>Communication:</strong> Talk to your teammates to share ideas and find solutions together.</li>
                    <li><strong>Observation:</strong> Pay attention to details. Every clue can be important.</li>
                    <li><strong>Logic:</strong> Use your logic and critical thinking to solve puzzles.</li>
                    <li><strong>Resilience:</strong> Don't be discouraged by obstacles. Persevere to achieve your goal!</li>
                </ul>
            </div>
            <button className="start-button" onClick={startGame}>Start</button>
        </div>
    );
};

export default HomePage;
