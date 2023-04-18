const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
//Our home route
app.get("/", (req, res) => {
    res.send("We are on home!")
})

//import postRoute
const postRoute = require("./routes/postRoute")
//our middleware route
app.use('/posts', postRoute)

//connect to db
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.groupCollapsed(error))
db.once('open', () => console.log("Connected to DB!"))

app.listen(3000, () => {
    console.log("Server Started on port 3000")
})