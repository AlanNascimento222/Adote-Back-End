import { DataTypes } from "sequelize";
import { conexao } from "../db/database.js";
import { Pet } from "./pet.js";

const FotoPet = conexao.define("FotoPet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pet_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Pet,
      key: "id"
    }
  },
  url_imagem: DataTypes.STRING,
  ordem: DataTypes.INTEGER
}, {
  tableName: "foto_pet",
  timestamps: false
});

Pet.hasMany(FotoPet, { foreignKey: "pet_id" });
FotoPet.belongsTo(Pet, { foreignKey: "pet_id" });

export { FotoPet };
