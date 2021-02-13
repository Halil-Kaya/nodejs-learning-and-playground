const express = require('express')
const Joi = require('@hapi/joi')
const router = express.Router()

const todos = []

router.get('/', (req, res) => {
    res.send(todos)
})

router.get('/:id', (req, res) => {
    const todo = todos.find((todo) => todo.id == req.params.id)
    if (todo) return res.send(todo)
    res.send(`${req.params.id} id li bir todo yok!`)
})

router.post('/', (req, res) => {

    const { error } = validateTodo(req.body)

    if (error) return res.send(error)

    if (todos.find(todo => todo.todo.toLowerCase() == req.body.todo.toLowerCase())) return res.send('boyle bir todo zaten var')

    todos.push({
        id: todos.length + 1,
        ...req.body
    })

    return res.send(req.body)
})

router.put('/:id', (req, res) => {

    const todo = todos.find(item => item.id == req.params.id)

    if (todo == undefined) return res.send('boyle bir todo yok!')

    const { error } = validateTodo(req.body)

    if (error) return res.send(error)

    todo.todo = req.body.todo
    return res.send(todo)
})

router.delete('/:id', (req, res) => {

    const todo = todos.find(item => item.id == req.params.id)

    if (todo == undefined) return res.send('boyle bir todo yok!')

    todos.splice(todos.indexOf(todo), 1)

    return res.send(todo)
})


const validateTodo = (todo) => {
    return Joi.object({
        todo: Joi.string().min(2).max(90).required()
    }).validate(todo)
}


module.exports = router