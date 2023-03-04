// // Import module.
// const { application } = require('express')
// const express = require('express')
// // Create instance.
// const app = express()

// app.get("/", (req, res) => {
//     res.send("Welcome to the")
// })

// app.listen(4000)

const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to the first page.")
})

app.get("/admin", function(req, res) {
    res.send("This is the admin page.")
})

app.listen(4000)