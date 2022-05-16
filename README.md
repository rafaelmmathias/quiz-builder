# Intro
This app is a quiz builder. Create as many quizzes as you want and them share them with anyone you want.
## About the stack
### Frontend
    the frontend application was made with React as a Single Page Application
    - TypeScript
    - React
    - Zustand
    - Styled Components
    - Antd (for UI purposes)

### Backend
    The backend application was made by ExpressJS and Typescript + Firebase
    - TypeScript
    - ExpressJS
    - Firebase
# Online Demo
You can see this app running online at: https://quiz-builder-peach.vercel.app/

# Getting Started

Make sure you have all Environment Variables, example:

### Front (.env file)

```
REACT_APP_API_URL=http://localhost:3333
REACT_APP_APP_URL=http://localhost:3000
REACT_APP_FB_API_KEY=xx
REACT_APP_FB_AUTH_DOMAIN=xx
REACT_APP_FB_PROJEC_TID=xx
REACT_APP_FB_STORAGE_BUCKET=xx
REACT_APP_FB_MESSAGING_SENDER_ID=xx
REACT_APP_FB_APP_ID=xx
REACT_APP_FB_MEASUREMENT_ID=xx
```

### API (.env file inside server folder)

```
PORT=xx
TYPE=xx
PROJECT_ID=xx
PRIVATE_KEY_ID=xx
PRIVATE_KEY=xx
CLIENT_EMAIL=xx
CLIENT_ID=xx
AUTH_URI=xx
TOKEN_URI=xx
AUTH_PROVIDER_X509_CERT_URL=xx
CLIENT_X509_CERT_URL=xx
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# API Server
You can run the API using the following commands:
### `cd server`
### `yarn start:dev`

---

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!