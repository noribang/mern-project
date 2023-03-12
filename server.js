// Import mongodb driver module.
// Opens connection to db.
const {MongoClient} = require('mongodb')
const express = require('express')
const { response } = require('express')
const app = express()
// Used to upload files.
const multer = require('multer')
// Create multer instance.
const upload = multer()
// Sanitize html injection.
const sanitizeHTML = require('sanitize-html')

let db
// Access ejs templating views.
app.set("view engine", "ejs")
app.set("views,", "./views")
// Using Middleware to access public directory with main.js.
app.use(express.static("public"))
// Using middleware to access json data sent from browser.
app.use(express.json())
// Using middleware to access html form data sent from browser.
app.use(express.urlencoded({extended: false}))

// Middleware function for very basic password protection.
function passwordProtected(req, res, next) {
    res.set("WWW-Authenticate", "Basic realm='Our MERN App'")
    // If user typed in correct password call next function.
    // Username: "admin". Password: "admin."
    if (req.headers.authorization === "Basic YWRtaW46YWRtaW4=") {
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

// Use middleware function passwordProtected for all
// request function below.
app.use(passwordProtected)

// READ:
// GET
app.get("/admin", function(req, res) {
    // res.send("This is the admin page.")

    // admin.ejs calls main.js
    res.render("admin")
})
// READ:
// GET api call.
// Return json.
app.get("/api/animals", async (req, res) => {
    // Returns array of all rows from animals table.
    const allAnimals = await db.collection("animals").find().toArray()
    // Return json as response to request.
    res.json(allAnimals)
})
// CREATE:
// POST request from CreateNewForm component. 
// Upload (multer) used to upload file.
app.post("/create-animal", upload.single("photo"), async (req, res) => {
    console.log(req.body)
    res.send("Thank you.")
})
// Middleware function to prevent js object injection in request.
function ourCleanup(req, res, next) {
    // Prevent js object injection in request.
    // If request body not string return empty string as precaution.
    if (typeof req.body.name != "string") req.body.name = ""
    if (typeof req.body.species != "string") req.body.species = ""
    if (typeof req.body._id != "string") req.body._id = ""

    // Prevent html injection.
    req.cleanData = {
        name: sanitizeHTML(req.body.name.trim(), {allowedTags: [], allowedAttributes: {}}),
        species: sanitizeHTML(req.body.species.trim(), {allowedTags: [], allowedAttributes: {}})
    }

    next()
}

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
