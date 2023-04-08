import React from "react";
import "./Rules.css";

function Rules({ onClose }) {
  return (
    <div className="rules-modal">
        <div className="rules-container">
            <h2>How to Play "Guess the Prompt"</h2>
            <button className="close-button" onClick={onClose}>
                &times;
            </button>
            <ol>
                <li>
                <strong>The Prompter creates a prompt</strong>
                <ul>
                    <li>Enter a prompt in the "Prompt" input field.</li>
                    <li>Click the "Generate Image" button to create an AI-generated image.</li>
                    <li>The generated image will appear on the screen.</li>
                </ul>
                </li>
                <li>
                <strong>The Guessers make their guesses</strong>
                <ul>
                    <li>Enter guesses in the "Guess" input field.</li>
                    <li>Click the "Submit Guess" button to submit each guess.</li>
                    <li>The app will calculate a score between 1 and 5000, indicating how close the guess is to the actual prompt.</li>
                </ul>
                </li>
                <li>
                <strong>Continue guessing</strong>
                <ul>
                    <li>Guessers will continue to make guesses, trying to get the highest score possible.</li>
                    <li>The Prompter can choose to show or hide the prompt by clicking the "Show Prompt" or "Hide Prompt" button.</li>
                </ul>
                </li>
                <li>
                <strong>Game over</strong>
                <ul>
                    <li>The game is over when the Guessers feel they have made their best guesses or when the Prompter decides to end the game.</li>
                    <li>The player with the highest score wins!</li>
                </ul>
                </li>
            </ol>
        </div>
    </div>
  );
}

export default Rules;
