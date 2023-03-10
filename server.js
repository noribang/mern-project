// Import mongodb driver module.
// Opens connection to db.
const {MongoClient, ObjectId} = require('mongodb')
const express = require('express')
const { response } = require('express')
const app = express()
// Used to upload files.
const multer = require('multer')
// Create multer instance.
const upload = multer()
// Sanitize html injection.
const sanitizeHTML = require('sanitize-html')
// File and folder package
const fse = require('fs-extra')
// Image manipulation.
const sharp = require('sharp') 
let db
// From node import path package.
const path = require('path')
/* Server can render React animalcard component for '/' route. */
// React
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const AnimalCard = require('./src/components/AnimalCard').default



// When app first lauches, make sure public/uploaded-photos folder exists.
fse.ensureDirSync(path.join("public", "uploaded-photos")) 

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

    // Render React animalcard component.
    const generatedHTML = ReactDOMServer.renderToString(
        <div className="container">
            {/* If no cards on page yet. */}
            {!allAnimals.length && <p>There are no animals yet, the admin needs to add a few.</p>}
            <div className="animal-grid mb-3">
                {allAnimals.map(animal => <AnimalCard key={animal._id} name={animal.name} species={animal.species} photo={animal.photo} id={animal._id} readOnly={true} />)}
            </div>
            <p><a href="/admin">Login / Manage the animal listings.</a></p>
        </div>
    )
    // Render template
    // res.render("home", {allAnimals})
    res.render("home", {generatedHTML})

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
app.post("/create-animal", upload.single("photo"), ourCleanup, async (req, res) => {
    // Process incoming photo.
    // console.log(req.file)
    if(req.file) {
        // Give file a name.
        const photofilename = `${Date.now()}.jpg`
        // Resize image
        await sharp(req.file.buffer).resize(844, 456).jpeg({quality: 60}).toFile(path.join("public", "uploaded-photos", photofilename))
        req.cleanData.photo = photofilename
    }
        
    console.log(req.body)
    // Talk to db.
    const info = await db.collection("animals").insertOne(req.cleanData)
    const newAnimal = await db.collection("animals").findOne({_id: new ObjectId(info.insertedId)})
    // res.send("Thank you.")

    // Respond with new animal posted to db.
    res.send(newAnimal)
})
// DELETE:
// DELETE request from AnimalCard.
app.delete("/animal/:id", async (req, res) => {
    // Protect db from injection attack.
    if (typeof req.params.id != "string") req.params.id = ""
    // Talk to db to delete image.
    const doc = await db.collection("animals").findOne({_id: new ObjectId(req.params.id)})
    if (doc.photo) {
        fse.remove(path.join("public", "uploaded-photos", doc.photo))
    }
    // Talk to db.
    db.collection("animals").deleteOne({_id: new ObjectId(req.params.id)})
    // Response.
    res.send("Good job")
})
// UPDATE:
// POST request.
app.post("/update-animal", upload.single("photo"), ourCleanup, async (req, res) => {
   if (req.file) {
    // If uploading a new photo
    // Give file a name.
    const photofilename = `${Date.now()}.jpg`
    // Resize image
    await sharp(req.file.buffer).resize(844, 456).jpeg({quality: 60}).toFile(path.join("public", "uploaded-photos", photofilename))
    req.cleanData.photo = photofilename
    // Info of previous version.
    const info = await db.collection("animals").findOneAndUpdate({_id: new ObjectId(req.body._id)}, {$set: req.cleanData})
    if (info.value.photo) {
        fse.remove(path.join("public", "uploaded-photos", info.value.photo))
    }
    res.send(photofilename)
   } else {
    // If not uploading a new photo
    db.collection("animals").findOneAndUpdate({_id: new ObjectId(req.body._id)}, {$set: req.cleanData})
    res.send(false)
   }
    
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
