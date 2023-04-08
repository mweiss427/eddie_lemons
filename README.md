# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install and run

* Verify npm is installed `npm --version`
* run `npm install`
* add your api key to ./server.js
* run `npm run dev`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## How to Play "Guess the Prompt"

### Overview

"Guess the Prompt" is a fun and engaging guessing game where one player, the Prompter, comes up with a secret prompt, and the other players, the Guessers, attempt to guess the prompt based on an AI-generated image.

### Instructions

#### Step 1: The Prompter creates a prompt

- The Prompter enters a prompt in the "Prompt" input field. A prompt can be a simple word, a phrase, or a short sentence.
- Click the "Generate Image" button to create an AI-generated image based on the prompt.
- The generated image will appear on the screen.

#### Step 2: The Guessers make their guesses

- The Guessers will take turns to enter their guesses in the "Guess" input field.
- Click the "Submit Guess" button to submit each guess.
- The app will calculate a score between 1 and 5000, indicating how close the guess is to the actual prompt. The higher the score, the closer the guess.

#### Step 3: Continue guessing

- The Guessers will continue to make guesses, trying to get the highest score possible.
- If needed, the Prompter can choose to show or hide the prompt by clicking the "Show Prompt" or "Hide Prompt" button.

#### Step 4: Game over

- The game is over when the Guessers feel they have made their best guesses or when the Prompter decides to end the game.
- The player with the highest score wins!

### Tips

- The Prompter can choose creative and unusual prompts to challenge the Guessers.
- The Guessers should think outside the box and consider various interpretations of the generated image.

Have fun playing "Guess the Prompt"!
