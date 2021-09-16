import app from './app'
import { startConecction } from './config/database'

async function main() {
    startConecction()
    await app.listen(app.get('port'))
    console.log('Servidor en el puerto', app.get('port'))
}
main();