import { DataTypes } from "sequelize";
import { conexao } from "../db/database.js";

const Usuario = conexao.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
  cpf: DataTypes.STRING,
  telefone: DataTypes.STRING,
  tipo: {
    type: DataTypes.ENUM("admin", "comum"),
    allowNull: false
  },
  data_cadastro: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM("Ativo", "Inativo"),
    defaultValue: "Ativo"
  }
}, {
  tableName: "usuario",
  timestamps: false
});

export { Usuario };
