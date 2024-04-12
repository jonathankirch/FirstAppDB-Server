const User = require('./User.js')

const { hash, compareSync } = require('bcrypt');


const login = async (req, res) => {
	const { name, password } = req.body

	try {
		const existingUser = await User.findOne({ name: name })

		if (!existingUser) {
			return res.status(400).json('Usuário não encontrado')
		}
		const senhaCorreta = await compareSync(password, existingUser.password)
		if (!senhaCorreta) {
			return res.status(400).json('Senha incorreta')
		}

		return res.status(200).json('Login bem-sucedido!')
	} catch (error) {
		console.error('Erro ao fazer login: ', error)
		return res.status(500).json('Erro interno no servidor (login)')
	}
}

const cadastro = async (req, res) => {
	const { name, email, password } = req.body

	const passwordHash = await hash(password, 10)

	try {
		const existingUserName = await User.findOne({ name: name })
		const existingUserEmail = await User.findOne({ email: email })

		if (existingUserName) {
			return res.status(400).json('Este nome de usuário ja está sendo utilizado!')
		}

		if (existingUserEmail) {
			return res.status(400).json('Email ja cadastrado!')
		}

		await User.create({ name: name, email: email, password: passwordHash })
		return res.status(201).json(`Usuário ${name} criado com sucesso!`)
	} catch (error) {
		console.error('Erro ao criar usuário: ', error)
		res.status(500).json('Erro interno no servidor (cadastro)')
	}
}

const deleteUser = async (req, res) => {
	const { name, email, password } = req.body

	try {
		const user = await User.findOne({ name, email })

		
		if (!user) {
			return res.status(400).json('Informações da conta incorretos. Por favor, tente novamente!')
		}
		
		const senhaCorreta = await compareSync(password, user.password)
		if (!senhaCorreta) {
			return res.status(400).json('Senha incorreta. Por favor, tente novamente!')
		}

		await User.deleteOne({ name, email })

		return res.status(200).json(`Usuário ${user.name} excluído com sucesso!`)
	} catch (error) {
		console.error('Erro ao excluír usuário do banco de dados', error)
		return res.json('Erro interno no servidor (delete user)')
	}
}

const users = async (req, res) => {
	try {
		const users = await User.find()
		return res.status(200).json(users)
	} catch (error) {
		console.error('Erro recuperar usuários do banco de dados:', error)
		return res.json('Erro interno no servidor (all users)')
	}
}

module.exports = { login, cadastro, deleteUser, users }
