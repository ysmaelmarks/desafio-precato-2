import express from "express";
import cors from "cors";
import routes from "./routes/main.js"
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { Sequelize } from "sequelize";

const swaggerDocument = YAML.load("./swagger.yaml");

// Inicializa o Sequelize
const sequelize = new Sequelize("database_name", "root", "password", {
  dialect: "mysql",
  host: "127.0.0.1"
});

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log("Database connection successfully"))
  .catch((error) => console.log("Unable to connect to database:", error))

// Sincroniza o Sequelize com o banco de dados
sequelize.sync()
  .then(() => console.log("Database successfully synchronized"))
  .catch((error) => console.log("Unable to sync the database:", error))

const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes(app);

export default app;
