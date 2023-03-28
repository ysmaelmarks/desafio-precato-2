import { Sequelize } from "sequelize";
import config from "./config.js";

const { database, username, password, host, port, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: dialect,
});

export default sequelize;
