import express from "express";

//Criando uma instância do express
const app = express();

app.use(express.json());


const livros = [
    {
        "id":"1",
        "titulo":"Homo Sapiens",
        "autor":"Yuval Noah Harari"
    },
    {
        "id":"2",
        "titulo":"Homo Deus",
        "autor":"Yuval Noah Harari"
    }
]

//Função auxiliar para filtrar livros
function buscarLivro(id){
    return livros.findIndex(livro => {
        return livro.id === id;
    });
}


//Crio uma rota raiz usando a função app.get
app.get('/', (req, res)=>{
    res.status(200).send("Workshop de NodeJs")
});

app.get('/livros',(req, res)=>{
   res.status(200).json(livros);
})

app.post('/livros', (req,res)=>{
    livros.push(req.body);
    res.status(201).send('Sucesso!');
});

//Consultar um livro específico
app.get('/livros/:id', (req, res)=>{
    const index = buscarLivro(req.params.id);
    res.status(200).json(livros[index]);
});

//Alterar um livro específico
app.put('/livros/:id', (req, res)=>{
    const index = buscarLivro(req.params.id);
    livros[index].titulo = req.body.titulo;

    res.status(200).json(livros);
});

//Excluir um livro específico
app.delete('/livros/:matricula', (req, res)=>{
    const index = buscarLivro(req.params.id);
    //remover apenas 1 livro
    console.log(`Livro com indice ${index} removido da lista`);
    livros.splice(index, 1);

    res.status(204).send("Livro excluído com sucesso!");
});



//Exporto o app para ser utilizado pelo server.js
export default app;
