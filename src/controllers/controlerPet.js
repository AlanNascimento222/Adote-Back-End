import { Pet } from "../models/pet.js"
import "dotenv/config"
import { gerarSenhaPadrao } from "../senha/geradorSenhas.js"
import { Adocao } from "../models/adocao.js"


// o usuário admin criando o PET
async function criarPet(req, res) {
    try {
        const { tipo_usuario, id_recebido } = req
        if (tipo_usuario == "admin") {
            const { nome, especie, raca, genero, idade, descricao } = req.body
            const petCriado = await Pet.create({
                nome, especie, raca, genero, idade, descricao, usuario_id: id_recebido
            })
            console.log(id_recebido)
            return res.status(201).send({ message: `Pet criado!.`, Pet: petCriado })
        } else {
            return res.status(403).send({ message: "Você não é admin, logue com a conta admin." })
        }
    } catch (err) {
        return res.status(500).send({ message: `Error interno: ${err}` })
    }
}

async function listarPets(_, res) {
    try {
        const pets = await Pet.findAll()
        return res.status(200).send({message: pets})
    } catch (err) {
        return res.status(500).send({message:"eu sinceramente não sei como você chegou aqui, mas se chegou, algo muito de errado tem com a sua requisição", Erro: err})
    }
}

async function criaAdotaPet(req, res) {
    try {
        const { id_recebido } = req
        const { id } = req.params

        if (!id_recebido || !id) {
            return res.status(400).send({ message: "você não está preenchendo todos os parametros" })
        } else {
            //adiciona 7 dias de validade
            const dataCriacao = new Date()
            const dataValidade = new Date(dataCriacao)
            dataValidade.setDate(dataCriacao.getDate() + 7)
            const senha = gerarSenhaPadrao()

            const newAdotaPet = await Adocao.create({
                usuario_id: id_recebido,
                pet_id: id,
                senha_confirmacao: senha,
                data_validade: dataValidade
            })

            return res.status(201).send({
                message: "pet em adoção",
                senha: senha,
                seuPet: newAdotaPet
            })
        }
    } catch(err) {
        return res.status(500).send({message: `Erro interno: ${err}`})
    }
}

export { criarPet, criaAdotaPet, listarPets }