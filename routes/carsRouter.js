const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: "data from db" })
})

module.exports = router