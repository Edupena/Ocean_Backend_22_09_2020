const express = require('express');
const bodyPrser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const jsonParser = bodyPrser.json();
app.use(jsonParser);


app.get('/', (req, res) =>{
    res.send('Hello world!');
});

//Endpoints de envio de mensagens
//CRUD -> Create, Read (Read all e Read single), Update and Delete
//CRUD -> Criar, Ler (ler tudo e ler individualmente), atualizar, remover

const mensagens = [
    {
        id: 0,
        texto:"Essa é uma mensagem teste."
    },
    {
        id: 1,
        texto: "Essa é outra mensagem" 
    }   
];

//Read all
app.get('/mensagens', (req, res) => {
    
    //Opção sem remover a exibição de espaços null no retorno de informação
    //res.json(mensagens);

    //Opção para remover a exibição de espaços null no retorno de informação
    res.json(mensagens.filter(Boolean));
});

//Create
app.post('/mensagens', (req, res) =>{
    //obtendo mensagem que foi recebida através do body da requisição
    const mensagem = req.body;

    //Obtendo o ID da nova mensagem
    const id = mensagens.length;

    //Atualzia o objeto de mensagem enviado pela requisição com o ID que foi calculado
    mensagem.id = id;
    
    //Insiro a mensagem na lista de mensagens
    mensagens.push(mensagem);    

    // Exibido o ID da mensagem, que no caso é o índice que ela foi adicionada
    res.send(`Mensagem com o texto: ${mensagem.texto}, foi criada com sucesso. ID: ${id}.`);
});

//Read Single
app.get('/mensagens/:id', (req, res) => {

    const id = req.params.id;

    const mensagem = mensagens [id];

    res.json(mensagem);    
});

//Update
app.put('/mensagens/:id', (req, res) =>{
    //Acessa o ID pelos paramentros
    const id = req.params.id;
    //obtem mensagem que foi recebida através do body da requisição
    const novoTexto = req.body.texto;

    //Obtem a mensagem que foi enviada pelo usuário no corpo (body) da requisição
    mensagens[id].texto = novoTexto;

    res.send(`Mensagem com o ID ${id}, foi atualizada com sucesso`);
});

//Delete
app.delete('/mensagens/:id', (req, res) =>{
    const id = req.params.id;
    
    delete mensagens[id];

    res.send(`Mensagem com o ID ${id}, foi removida da lista.`);
});

app.listen(port, () => {
    console.log(`App rodadno em http://localhost:${port}`);
  });