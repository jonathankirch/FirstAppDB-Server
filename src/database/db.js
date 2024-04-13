const mongoose = require('mongoose')

require('dotenv').config()

const secret = process.env.SECRET_KEY

const connectDataBase = async () => {
  try{
    await mongoose 
      .connect(`mongodb+srv://kirchdead:${secret}@firstappdb.quzfipz.mongodb.net/?retryWrites=true&w=majority&appName=FirstAppDB`)
    console.log('Banco de dados conectado com sucesso! 🚀')
  }
  catch(error){
    console.error(`Erro ao  conectar banco de dados: ${error}`)
  }
}

module.exports = { connectDataBase }