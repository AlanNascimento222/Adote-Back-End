import jwt from 'jsonwebtoken'


function validarToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(`authHeader: ${JSON.stringify(authHeader)}`)
    try {
        const conteudoTokenJWT = jwt.verify(authHeader, process.env.JWT_SECRET)
        console.log(`conteudo JWT:${JSON.stringify(conteudoTokenJWT)}`)
        req.id_recebido = conteudoTokenJWT.id
        req.tipo_usuario = conteudoTokenJWT.tipo
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).send({ mensagem: "Error: credencial invalida" })
        
    }
}

export { validarToken }