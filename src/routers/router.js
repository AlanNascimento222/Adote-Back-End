import express from 'express'
import { listar, criar, puxarId, excluir, atualizar, login} from '../controllers/controler.js'
import { validarToken } from '../controllers/Middleware.js'
import { criarPet } from '../controllers/controlerPet.js'

const router = express.Router()

// Rota de Autenticação
router.post('/login', login)

// Rotas de CRUD
router.get('/', validarToken, listar)
router.get('/:id', validarToken, puxarId)
router.post('/', criar)
router.post('/pet', validarToken, criarPet)
// router.post('/popular', popular)
router.put('/:id', validarToken, atualizar)
router.delete('/:id', validarToken, excluir)

export { router }