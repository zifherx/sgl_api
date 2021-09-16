import { connect } from 'mongoose'
import index from './index'

export async function startConecction() {
    const db = await connect(index.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    console.log(`Database ${db.connection.name} is connected`)
}