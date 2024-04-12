const express = require('express')
const { connectDataBase } = require('./database/db.js')
const routes = require('./routes.js')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3001

const corsOptions = {
  origin: '*'
};

app.use(express.json())

app.use(cors(corsOptions))

app.use(routes)

connectDataBase()

app.listen(port, () => {
	console.log(`Servidor rodando na porta: ${port}`)
})
