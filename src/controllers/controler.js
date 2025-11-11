import { DataTypes } from "sequelize";
// import { conexao } from "../bd/database.js";

const Cerveja = conexao.define('Cerveja', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abv: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nacionalidade: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: 'Cervejas'
})

export { Cerveja }