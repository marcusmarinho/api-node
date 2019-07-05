'use strict' // Faz uma análise criteriosa no arquivo, de acordo com a sintaxe
/*const xpto = require('./teste') // Indica que o caminho vem de uma pasta específica  e nao do Node Modules*/
 
const http = require('http'); //Servidor HTTP
const app = require('../src/app');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Criar o servidor http utilizando o modelo MVC do Express
const server = http.createServer(app);

server.listen(port);
server.on('error', onError); //Se der erro, chama a função de erro
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

//Função do Express
function normalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}

//Função do Express
function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;
    
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
//Função listening
function onListening() {
    const addr = server.address();
}