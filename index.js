const express = require('express');

const app = express();

app.use(express.json());

const books = [
    {title : 'Java Programming', id: 1},
    {title : 'Node Programming', id: 2},
    {title : 'PHP Programming', id: 3},
]


app.get('/', (req, resp) =>{
    resp.send('Welccome to Learn API with node JS')
});

const port = 3000;
app.listen(port, () =>{
    console.log(`server is listening on port ${port}..`);
});