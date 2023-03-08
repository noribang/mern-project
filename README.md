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
npm nodemon <file_name>
e.g.
npm nodemon main.js
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

## MongoDB in Docker container setup
Start local server.
```bash
touch docker-compose.yml
```

Inside docker-compose.yml
```bash
version: "3.9"
services:
  mongo:
    container_name: "mernstackdb"
    image: mongo:5.0.8-focal
    restart: always
    ports:
      - 27017:27017
    volumes:
      - ./db:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
```

Command in Bash to install MongoDB image inside Docker container.
```bash
docker compose up -d
```

Start or stop Docker Mongodb.
```bash
docker compose stop
docker compose start
```

Download GUI client for Mongodb.
https://www.mongodb.com/products/compass

Connection string to use in Mongodb Compass
mongodb://root:root@localhost:27017/

## Install MongoDB driver
Start local server.
```bash
npm install mongodb
```

## ejs templating engine
Install.
```bash
npm install ejs
```
s
## Install Reactjs 
Start local server.
```bash
npm install react react-dom @babel/core @babel/preset-react babel-loader webpack webpack-cli webpack-node-externals npm-run-all
```

## Create web.config.js  
Create under root directory. Automates and bundles JSX to regular JS.
```bash
touch web.config.js
```


