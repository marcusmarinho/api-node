'use strict' // Faz uma análise criteriosa no arquivo, de acordo com a sintaxe
/*const xpto = require('./teste') // Indica que o caminho vem de uma pasta específica  e nao do Node Modules*/
 
const http = require('http'); //Servidor HTTP
const express = require('express'); //Express - modulo do Node para criar um MVC Model e outros recursos
const debug = require('debug')('nodestr:server'); //Debugar a aplicação

const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Criar o servidor http utilizando o modelo MVC do Express
const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route);

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
onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
}