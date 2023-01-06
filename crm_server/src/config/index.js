import {config} from 'dotenv';
config();

const mongoURI = process.env.MONGO_URI;
const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

export default {
    SECRET: 'API_SGL_AUTONORT',
    // mongoURL: process.env.MONGO_URI_LOCAL
    mongoURL: `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoURI}?retryWrites=true&w=majority`,
}