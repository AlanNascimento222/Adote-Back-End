import "dotenv/config";
import { Sequelize } from 'sequelize'

const conexao = new Sequelize(process.env.BD_PASSWORD_WITH_LINK)

export { conexao }


///----
///backet para hospedagens de imagens // aws // s3
///----
///Buffer imagem backend
///----