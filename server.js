// Import mongodb driver module.
// Opens connection to db.
const {MongoClient} = require('mongodb')


const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to the first page.")
})

app.get("/admin", function(req, res) {
    res.send("This is the admin page.")
})

app.listen(4000)