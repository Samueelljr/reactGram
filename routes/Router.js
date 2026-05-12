const express = require('express')
const router = express()

router.use("/api/users", require('./UserRoutes'))

router.get("/", (req, res) => {
    res.send("Api funcionando")
})



module.exports = router