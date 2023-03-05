// Import mongodb driver module.
// Opens connection to db.
const {MongoClient} = require('mongodb')
const express = require('express')
const app = express()

let db

app.get("/", async (req, res) => {
    const allAnimals = await db.collection("animals").find().toArray() 
    // console.log(allAnimals)
    // res.send("Welcome to the first page.")
    res.send(`<h1>Welcome to the page</h1> ${allAnimals.map(animal => `<p>${animal.name} - ${animal.species}</p>`).join('')}`)


})

app.get("/admin", function(req, res) {
    res.send("This is the admin page.")
})

// Connect to db.
// Async returns Promise.
async function start() {
    const client = new MongoClient("mongodb://root:root@localhost:27017/AmazingMernApp?&authSource=admin")
    await client.connect()
    // Returns db.
    db = client.db()
    app.listen(4000)    
}
start()
