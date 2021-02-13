const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    console.log('ana sayfaya gidildi');
    res.send('merhaba from index')
})

module.exports = router