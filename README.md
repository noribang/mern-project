# mern-project

## Installation
Create new project directory.
```bash
mkdir new_express_project
```
Start new node express project.
```bash
npm init -y
```
Install express server.
```bash
npm install express
```
Create file to write express server code in.
```bash
touch main.js
```

## Local server
Start local server.
```bash
node <file_name>
e.g.
node main.js
```
Stop local server.
```bash
ctrl + c
```
Install nodemon. Allows you to not have to keep stopping and re-starting server after every change to files.  
```bash
npx nodemon <file_name>
e.g.
npx nodemon main.js
```

## CORS package
Install.
```bash
npm install cors
```

## Usage
In main.js file:
```javascript

// Import expess module.
const express = require('express')
// Created express instance.
const app = express()

// Create route '/'. 
// Create GET request and respond with simple string message to browser.
app.get('/', (req, res) => {
    res.send("Hello world.")
})

// Listen localhost 4000
app.listen(4000)

```
