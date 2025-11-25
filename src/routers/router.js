import express from 'express'
import { listar, criar, puxarId, excluir, atualizar, login} from '../controllers/controler.js'
import { validarToken } from '../controllers/Middleware.js'

const router = express.Router()

// Rota de Autenticação
router.post('/login', login)

// Rotas de CRUD
router.get('/', validarToken, listar)
router.get('/:id', validarToken, puxarId)
router.post('/', validarToken, criar)
// router.post('/popular', popular)
router.put('/:id', validarToken, atualizar)
router.delete('/:id', validarToken, excluir)

export { router }