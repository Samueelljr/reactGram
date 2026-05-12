const mongoose = require('mongoose')

// connection

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.wddjfy8.mongodb.net/`)

        console.log('Conectou ao banco')

        return dbConn
    } catch (error) {
        console.log("Falha na autenticacao")
        console.log(error)
    }
}

conn()

module.exports = conn