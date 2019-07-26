//Chave interna que fica apenas no servidor, usada para geração de token, etc
global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Store!';

module.exports = {
    connectionString: 'mongodb+srv://melissa:usermel2019@cluster0-inujy.mongodb.net/ndstr?retryWrites=true&w=majority',
    sendgridKey: 'TBD', //Usado para enviar email
    containerConnectionString: 'SUA CONNECTION STRING' // Usado para armazenar as imagens do produto
}