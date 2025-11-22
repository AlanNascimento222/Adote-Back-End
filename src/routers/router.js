import express from 'express'
import { listar, criar, puxarId, excluir, atualizar, login, popular } from '../controllers/controler.js'

const router = express.Router()

// Rota de Autenticação
router.post('/login', login)

// Rotas de CRUD
router.get('/', listar)
router.get('/:id', puxarId)
router.post('/', criar)
// router.post('/popular', popular)
router.put('/:id', atualizar)
router.delete('/:id', excluir)

export { router }