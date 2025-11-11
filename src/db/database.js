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
      require: true,        
      rejectUnauthorized: false,
    },
  },
  logging: false, 
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