import "dotenv/config"
import express from 'express'
import { conexao } from './db/database.js'
import { Adocao } from "./models/adocao.js"
import { FotoPet } from "./models/fotopet.js"
import { Pet } from "./models/pet.js"
import { Usuario } from "./models/usuario.js"
import { router } from './routers/router.js'


const app = express()

app.use(express.json())
app.use('/usuario', router)

app.get('/', (_, res) => {
    res.status(200).json({ resposta: "olá, seja bem vindo a API de PETs"})
})

try {
    await conexao.authenticate()
    // await conexao.sync({ alter: true })

} catch(erro) {
    console.log(`Error: ${erro}`)
}


app.listen(3000, () => console.log('API Iniciada'))  