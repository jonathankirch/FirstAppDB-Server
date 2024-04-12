const { Router } = require('express')
const { login, cadastro, deleteUser, users } = require('./models/User/UserController.js')

const routes = Router()

routes.post('/login', login)
routes.post('/cadastro', cadastro)
routes.delete('/deletar', deleteUser)
routes.get('/users', users)

module.exports = routes