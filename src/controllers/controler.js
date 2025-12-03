import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Pet } from "../models/pet.js"
import { Usuario } from "../models/usuario.js"
import "dotenv/config"

async function login(req, res) {
    try {
        const { email, senha } = req.body
        const usuario = await Usuario.findOne({ where: { email } })

        if (!usuario) return res.status(401).send({ mensagem: 'Email ou senha incorretos' })

        // Valida senha criptografada
        if (!bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(401).send({ mensagem: 'Email ou senha incorretos' })
        }

        // Gera token JWT
        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).send({ mensagem: 'Login sucesso', token, usuarioId: usuario.id })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: `Erro login: ${err}` })
    }
}

// async function popular(req, res) {
//     try {
//         const listaUsuarios = req.body // Pega o array direto do Postman

//         // Verifica se é realmente uma lista para evitar quebra
//         if (!Array.isArray(listaUsuarios)) {
//             return res.status(400).send({ mensagem: 'O corpo deve ser uma lista (array) []' })
//         }

//         // Percorre a lista recebida criptografando as senhas
//         const usuariosProntos = listaUsuarios.map(user => ({
//             ...user,
//             senha: bcrypt.hashSync(user.senha, 10),
//             tipo: user.tipo || 'usuario' // Garante um tipo padrão caso não venha no JSON
//         }))

//         // Salva tudo de uma vez no banco
//         await Usuario.bulkCreate(usuariosProntos)
        
//         res.status(201).send({ mensagem: 'Lista de usuários importada com sucesso!' })
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ mensagem: `Erro ao popular: ${err}` })
//     }
// }

async function criarPet(req, res) {
    try{
        
    } catch (err) {

    }
}

async function listar(req, res) {
    try {
        const usuarios = await Usuario.findAll()
        return res.status(200).send({ mensagem: usuarios })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: `Erro: ${err}` })
    }
}

async function puxarId(req, res) {
    try {
        const { id } = req.params
        const usuario = await Usuario.findByPk(id, { attributes: { exclude: ['senha'] } })
        res.status(200).send({ mensagem: usuario })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: 'Erro Interno' })
    }
}

async function excluir(req, res) {
    try {
        const { id } = req.params
        const {tipo_usuario} = req

        console.log(tipo_usuario)
        if (tipo_usuario == "admin") {
            await Usuario.destroy({ where: { id } })
            res.status(200).send({ mensagem: 'Usuário excluído' })
        } else {
            throw new Error("sem permissões para isso")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: `${err}` })
    }
}

async function criar(req, res) {
    try {
        const { nome, email, senha, cpf, telefone, tipo } = req.body
        
        if (!nome || !email || !senha || !cpf || !telefone || !tipo) {
            return res.status(400).send({ mensagem: 'Preencha todos os campos' })
        }

        // Criptografa senha antes de salvar
        const senhaHash = bcrypt.hashSync(senha, 10)

        const usuarioCriado = await Usuario.create({ 
            nome, email, senha: senhaHash, cpf, telefone, tipo 
        })
        
        res.status(201).send({ mensagem: usuarioCriado })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: `Erro ao criar: ${err}` })
    }
}

async function atualizar(req, res) {
    try {
        const { nome, email, senha, cpf, telefone } = req.body
        const { id } = req.params
        
        let dados = { nome, email, cpf, telefone }

        // Se enviou senha nova, criptografa
        if (senha) dados.senha = bcrypt.hashSync(senha, 10)

        await Usuario.update(dados, { where: { id } })
        res.status(200).send({ mensagem: 'Usuário atualizado' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

export { listar, criar, puxarId, excluir, atualizar, login }