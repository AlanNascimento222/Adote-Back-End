import { DataTypes } from "sequelize";
import { conexao } from "../bd/database.js";
import { Usuario } from "./usuario.js";
import { Pet } from "./pet.js";

const Adocao = conexao.define("Adocao", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: "id"
    }
  },
  pet_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Pet,
      key: "id"
    }
  },
  senha_confirmacao: DataTypes.STRING,
  data_validade: DataTypes.DATE,
  data_adocao: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM("Ativa", "Expirada", "Concluída"),
    defaultValue: "Ativa"
  }
}, {
  tableName: "adocao",
  timestamps: false
});

Usuario.hasMany(Adocao, { foreignKey: "usuario_id" });
Pet.hasMany(Adocao, { foreignKey: "pet_id" });
Adocao.belongsTo(Usuario, { foreignKey: "usuario_id" });
Adocao.belongsTo(Pet, { foreignKey: "pet_id" });

export { Adocao };
