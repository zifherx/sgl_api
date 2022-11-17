import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import indexRoutes from "./routes";
import "dotenv/config";
import * as initData from "./libs/initialSetup";

//Creando Servidor
const app = express();

//Carga de roles
initData.createRoles();
//Carga de Admin User
initData.createAdminUser();

//Settings
app.set("port", Number(process.env.PORT) || 5000);

let puertoFront = 8081;

//Middlewares
app.use(cors({
    origin: ['https://autonortnor.com', `http://localhost:${puertoFront}`],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
// app.use(helmet())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api", indexRoutes);

//Static
app.use("/public/uploads", express.static(path.resolve("uploads")));

export default app;