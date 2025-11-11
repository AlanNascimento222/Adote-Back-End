// import "dotenv/config"
// import { Sequelize } from 'sequelize'

// const conexao = new Sequelize(process.env.BD_PASSWORD_WITH_LINK)

// export { conexao }

import "dotenv/config";
import { Sequelize } from "sequelize";


const conexao = new Sequelize(process.env.BD_PASSWORD_WITH_LINK, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,        // Supabase exige SSL
      rejectUnauthorized: false, // necessário para evitar erro de certificado
    },
  },
  logging: false, // opcional, desativa logs SQL no console
});

try {
    await conexao.authenticate()
    await conexao.sync({ alter: true })

} catch(erro) {
    console.log(`Error: ${erro}`)
}

export { conexao };


///----
///backet para hospedagens de imagens // aws // s3
///----
///Buffer imagem backend
///----