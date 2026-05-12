require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')

const port = process.env.PORT;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// validando bloqueios de cors
app.use(cors({ credentials: true, origin: 'http://localhost:5173'}))

// diretorio para upload de imagens
app.use("uploads", express.static(path.join(__dirname, "/uploads")))

// conexão com DB
require('./config/db.js')

// routes
const router = require('./routes/Router.js')

app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`)
})