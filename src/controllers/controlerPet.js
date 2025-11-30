import { Pet } from "../models/pet.js"
import "dotenv/config"

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

export { criarPet }