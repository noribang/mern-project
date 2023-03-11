// Import mongodb driver module.
// Opens connection to db.
const {MongoClient} = require('mongodb')
const express = require('express')
const { response } = require('express')
const app = express()

let db
// Access ejs templating views.
app.set("view engine", "ejs")
app.set("views,", "./views")
// Middleware access public directory with main.js.
app.use(express.static("public"))

// Middleware function for very basic password protection.
function passwordProtected(req, res, next) {
    res.set("WWW-Authenticate", "Basic realm='Our MERN App'")
    // If user typed in correct password call next function.
    if (req.headers.authorization === "1234") {
        next();
    } else {
    // Else respond with error message.
        console.log(req.headers.authorization)
        res.status(401).send("Try again.")
    }
}


app.get("/", async (req, res) => {
    const allAnimals = await db.collection("animals").find().toArray() 
    // console.log(allAnimals)
    // res.send("Welcome to the first page.")
    // res.send(`<h1>Welcome to the page</h1> ${allAnimals.map(animal => `<p>${animal.name} - ${animal.species}</p>`).join('')}`)

    // Render template
    res.render("home", {allAnimals})

})

app.get("/admin", function(req, res) {
    // res.send("This is the admin page.")

    // admin.ejs calls main.js
    res.render("admin")
})
// Return json.
app.get("/api/animals", async (req, res) => {
    // Returns array of all rows from animals table.
    const allAnimals = await db.collection("animals").find().toArray()
    // Return json as response to request.
    res.json(allAnimals)
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
