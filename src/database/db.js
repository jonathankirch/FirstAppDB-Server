const mongoose = require('mongoose')

require('dotenv').config()

const secret = process.env.SECRET_KEY

const connectDataBase = async () => {
  try{
    await mongoose 
      .connect(`mongodb+srv://kirchdead:${secret}@firstmongodb.f9mrjmp.mongodb.net/?retryWrites=true&w=majority&appName=FirstMongoDB`)
    console.log('Banco de dados conectado com sucesso! 🚀')
  }
  catch(error){
    console.error(`Erro ao  conectar banco de dados: ${error}`)
  }
}

module.exports = { connectDataBase }