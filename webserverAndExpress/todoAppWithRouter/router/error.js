const express = require('express')
const router = express.Router()

router.use((req, res) => {
    return res.send('boyle bir endpoint yok!')
})

module.exports = router