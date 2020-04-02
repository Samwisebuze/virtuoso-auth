const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()
const userService = require('./user.service')

// core routes
router.post('/authenticate', authenticate)
router.post('/register',
            [
                // validate that the username is an email address
                check('username').isEmail().withMessage('username must be an email address')
            ],
            register)
router.get('/current', getCurrent)
router.get('/status', (req, res) => res.json({ status: 'ok' }))

// other routes
// router.get('/', getAll)
// router.get('/:id', getById)
// router.put('/:id', update)
// router.delete('/:id', _delete)

module.exports = router

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err))
}

function register(req, res, next) {
    // Validate that the username is an email address
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err))
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err))
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err))
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err))
}
