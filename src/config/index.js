import {config} from 'dotenv';
config();

export default {
    SECRET: 'API_SGL_AUTONORT',
    // mongoURL: process.env.MONGO_URI_LOCAL
    mongoURL: process.env.MONGO_URI_ONLINE
}