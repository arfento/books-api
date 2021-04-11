const express = require('express');

const app = express();

app.use(express.json());

const books = [
    {title : 'Java Programming', id: 1},
    {title : 'Node Programming', id: 2},
    {title : 'PHP Programming', id: 3},
]


app.get('/', (req, resp) =>{
    resp.send('Welcome to Learn API with node JS!!')
});

app.get('/api/books', (req, res) => {
    res.send(books);
});

app.get('/api/books/:id' , (req, res) =>{
    const book = books.find( v => v.id === parseInt(req.params.id));
    if(!book){
        res.status(404).send('Books not Found');
    }
    res.send(book);
});


app.post('/api/books/addBook', (req, res) =>{
    const book = {
        id: books.length+1,
        title : req.body.title,
    };
    books.push(book);
    res.send(book);
});

app.put('/api/books/:id' , (req, res) =>{
    const book = books.find( v => v.id === parseInt(req.params.id));
    if(!book){
        res.status(404).send('Books not Found');
    }

    book.title = req.body.title;
    
    res.send(book);
});

app.delete('/api/books/:id' , (req, res) =>{
    const book = books.find( v => v.id === parseInt(req.params.id));
    if(!book){
        res.status(404).send('Books not Found');
    }
    const index = books.indexOf(book);

    //yang terdelete hanya index ke 1
    books.splice(index, 1);
    res.send(book);

    console.log("data berhasil terhapus");
});

const port = 3000;
app.listen(port, () =>{
    console.log(`server is listening on port ${port}..`);
});