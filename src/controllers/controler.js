// import { Adocao } from "../models/adocao"
// import { FotoPet } from "../models/fotopet"
import { Pet } from "../models/pet.js"
import { Usuario } from "../models/usuario.js"

async function listar(req, res) {
    try {
        const usuario = await Usuario.findAll()
        return res.status(200).send({ mensagem: usuario })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: `Erro ao executar chamada ${err}` })
    }
}

async function puxarId(req, res) {
    try {
        const { id } = req.params
        const usuario = await Usuario.findByPk(id)
        res.status(200).send({ mensagem: usuario})
    } catch(err) {
        console.log(err)
        res.status(500).send({ mensagem: 'Erro Interno'})
    }
}

async function excluir(req, res) {
    try {
        const { id } = req.params
        await Usuario.destroy({where: { id }})
    } catch(err) {
        console.log(err)
        res.status(500).send({mensagem: 'Erro Interno'})
    }
}

async function criar(req, res) {
    try {
        const { nome, email, senha, cpf, telefone, tipo } = req.body
        if (!nome || !email || !senha || !cpf || !telefone || !tipo) {
            return res.status(400).send({ mensagem: 'Escreva todos os campos obrigatórios' })
        }
        const usuarioCriado = await Usuario.create({ nome, email, senha, cpf, telefone, tipo })
        res.status(201).send({ mensagem: usuarioCriado })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: `Erro ao criar o novo usuário ${err}` })
    }
}

async function atualizar(req, res) {
    try {
        const { nome, email, senha, cpf, telefone } = req.body
        const { id } = req.params
        if (!nome || !email || !senha || !cpf || !telefone || !id) {
            return res.status(400).send({ mensagem: 'Campos não preenchidos' })
        }
        const UsuarioAtualizado = await Usuario.update({ nome, email, senha, cpf, telefone }, { where: { id } })
        res.status(201).send({ mensagem: UsuarioAtualizado })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: 'Erro interno' })
    }
}

export { listar, criar, puxarId, excluir, atualizar }