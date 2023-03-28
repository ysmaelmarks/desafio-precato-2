import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const User = sequelize.define(
    'User',
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false
        }
        ,
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          }
    },
    {
        timestamps: false,
    }
);

(async () => {
  try {
    await sequelize.sync();
    console.log("Tabelas criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
})();

export default User;
