# Eddie Lemons - Personal AI Assistant

# Eddie Lemons - Personal AI Assistant

Eddie Lemons is a personal AI assistant that can help you with a variety of tasks, from coding to setting goals. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install and run

* Verify npm is installed `npm --version`
* run `npm install`
* add your OpenAI API key to `./server.js`
* run `npm run dev`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000/) to view it in your browser.

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

## Goal Helper

The Goal Helper feature of Eddie Lemons can assist you in setting and tracking your goals.

### Instructions

1. Enter a short description of your goal in the "Enter Goal" input field.
2. Click the "Add Goal" button to add the goal to the list.
3. To mark a goal as completed, click the checkbox next to the goal.
4. To remove a goal from the list, click the "Remove" button next to the goal.

### Tips

* Be specific when setting your goal. This will make it easier to track progress and know when you've achieved it.
* Break large goals into smaller, more manageable tasks. This can make the goal seem less daunting and help keep you motivated.

## About

This project was created by [Your Name] as part of [a course/an independent project/etc.]. It uses [React](https://reactjs.org/) for the front-end and [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) for the back-end. The OpenAI API is used for the AI assistant functionalit

Eddie Lemons is a personal AI assistant that helps you with coding by providing code suggestions and explanations. It uses the OpenAI GPT-3 API to generate responses to your coding-related queries.

## How to install and run

* Verify npm is installed `npm --version`
* run `npm install`
* add your OpenAI API key to `./server.js`
* run `npm run dev`

## Features

### Coding Helper

The "Coding Helper" feature allows you to enter a prompt and a code snippet and get an AI-generated response containing suggestions and explanations for your code. Simply enter your prompt and code snippet in the provided fields, and Eddie Lemons will generate a response based on your inputs.

### Guess the Prompt

The "Guess the Prompt" game is a fun and engaging guessing game where one player comes up with a secret prompt, and the other players attempt to guess the prompt based on an AI-generated image. Eddie Lemons generates the image based on the prompt provided, and the players take turns guessing the prompt based on the generated image.

## How to use

### Coding Helper

1. Navigate to the "Coding Helper" page.
2. Enter your prompt and code snippet in the provided fields.
3. Click the "Get Response" button.
4. Eddie Lemons will generate a response based on your inputs.

### Guess the Prompt

1. Navigate to the "Guess the Prompt" page.
2. The "Prompter" enters a prompt in the "Prompt" input field.
3. Click the "Generate Image" button to create an AI-generated image based on the prompt.
4. The generated image will appear on the screen.
5. The "Guessers" will take turns to enter their guesses in the "Guess" input field.
6. Click the "Submit Guess" button to submit each guess.
7. Eddie Lemons will calculate a score between 1 and 5000, indicating how close the guess is to the actual prompt. The higher the score, the closer the guess.
8. The Guessers will continue to make guesses, trying to get the highest score possible.
9. If needed, the Prompter can choose to show or hide the prompt by clicking the "Show Prompt" or "Hide Prompt" button.

## Technologies used

* React
* Node.js
* Express.js
* MongoDB
* OpenAI GPT-3 API

## Acknowledgements

This project was created as part of a coding challenge. The AI-generated images used in the "Guess the Prompt" game were generated using the DALL-E API by OpenAI.
