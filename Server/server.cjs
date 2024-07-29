// Imports
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const ConnectToDb = require('./Config/dbConfig')


// Creating App
const app = express()

// Middlewares
dotenv.config()
app.use(bodyParser.json())
app.use(cors())

// DB Connection
ConnectToDb()

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Listening the server at port ${port}...`)
})

