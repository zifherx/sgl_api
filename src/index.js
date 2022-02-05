import app from './app';
import initializeDB from './config/database';

async function main() {
    await app.listen(app.get('port'))
    console.log('Server on port', app.get('port'))
    await initializeDB();
}

main();