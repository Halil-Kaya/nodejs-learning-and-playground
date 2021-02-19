const router = require('express').Router()
const User = require('../models/userModel')

const createError = require('http-errors')

router.get('/', async(req, res) => {
    const allUsers = await User.find({})
    res.json(allUsers)
})

router.get('/:id', (req, res) => {
    res.json({ mesaj: 'id si : ' + req.params.id + 'olan user listelenecek' })
})

router.post('/', async(req, res) => {

    try {

        const eklenecekUser = new User(req.body)
        const result = await eklenecekUser.save()
        return res.send(result)

    } catch (err) {

        console.log('user kaydederken hata oldu' + err);
        return res.json(err)
    }

})

router.patch('/:id', async(req, res, next) => {


    try {

        const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (result) {
            return res.json(result)
        } else {
            return res.status(404).send('boyle bir kullanici yok')
        }

    } catch (err) {
        next(createError(err))
    }
})

router.delete('/:id', async(req, res, next) => {

    try {

        const result = await User.findByIdAndDelete({ _id: req.params.id })

        if (result) {
            return res.send(result)
        } else {
            //return res.status(404).send('boyle bir kullanici yok')
            throw createError(404, 'kullanici bulunamadi')
        }

    } catch (err) {

        next(createError(err))

    }

})


module.exports = router