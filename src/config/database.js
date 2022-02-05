import { connect } from 'mongoose'
import index from './index'

const initializeDB = async () => {
    try {
        let con = await connect(index.mongoURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        let dbName = con.connection.name;
        let dbPort = con.connection.port;
        console.log('DB', dbName, 'is connected on port', Number(dbPort));
    } catch (err) {
        console.log(err);
    }
}

export default initializeDB;