import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import indexRoutes from './routes';
import 'dotenv/config';
import * as initData from './libs/initialSetup';

//Creando Servidor
const app = express()

//Carga de roles
initData.createRoles();
//Carga de Admin User
initData.createAdminUser();

//Settings
app.set('port', Number(process.env.PORT) || 4000)

//Middlewares
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/api', indexRoutes)

//Static
app.use('/public/uploads', express.static(path.resolve('uploads')))

export default app;