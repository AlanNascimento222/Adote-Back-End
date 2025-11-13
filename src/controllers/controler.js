// import { Adocao } from "../models/adocao"
// import { FotoPet } from "../models/fotopet"
import { Pet } from "../models/pet.js"
import { Usuario } from "../models/usuario.js"

async function listar(req, res) {
    try {
        const pets = await Usuario.findAll()
        return res.status(200).send({ mensagem: pets })
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensagem: `Erro ao executar chamada ${err}` })
    }
}

async function puxarId(req, res) {
    // try {
    //     const { id } = req.params
    //     const cerveja = await Cerveja.findByPk(id)
    //     res.status(200).send({ mensagem: cerveja})
    // } catch(err) {
    //     console.log(err)
    //     res.status(500).send({ mensagem: 'Erro Interno'})
    // }
}

async function excluir(req, res) {
    // try {
    //     const { id } = req.params
    //     await Cerveja.destroy({where: { id }})
    // } catch(err) {
    //     console.log(err)
    //     res.status(500).send({mensagem: 'Erro Interno'})
    // }
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
    // try {
    //     const { nome, abv, tipo, nacionalidade } = req.body
    //     const { id } = req.params
    //     if (!nome || !abv || !tipo || !nacionalidade || !id) {
    //         return res.status(400).send({ mensagem: 'Campos não preenchidos' })
    //     }
    //     const cervejaAtualizado = await Cerveja.update({ nome, abv, tipo, nacionalidade }, { where: { id } })
    //     res.status(201).send({ mensagem: cervejaAtualizado })
    // } catch (err) {
    //     console.log(err)
    //     res.status(500).send({ mensagem: 'Erro interno' })
    // }
}

export { listar, criar }