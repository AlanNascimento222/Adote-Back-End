import { DataTypes } from "sequelize";
import { conexao } from "../db/database.js";
import { Usuario } from "./usuario.js";

const Pet = conexao.define("Pet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: DataTypes.STRING,
  especie: DataTypes.STRING,
  raca: DataTypes.STRING,
  genero: DataTypes.STRING,
  idade: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("Disponível", "Adotado", "Pendente"),
    defaultValue: "Disponível"
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: "id"
    }
  },
  data_cadastro: DataTypes.DATE
}, {
  tableName: "pet",
  timestamps: false
});

Usuario.hasMany(Pet, { foreignKey: "usuario_id" });
Pet.belongsTo(Usuario, { foreignKey: "usuario_id" });

export { Pet };
