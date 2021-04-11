const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.json());
var database;


app.get('/', (req, resp) =>{
    resp.send('Welcome to Mongo DB API!!');
});

app.get('/api/books', (req, res) => {
    database.collection('books').find({}).toArray((err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.get('/api/books/:id' , (req, res) =>{
    database.collection('books').find({id: parseInt(req.params.id)}).toArray((err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.post('/api/books/addBook', (req, res) =>{
    let resp = database.collection('books').find({}).sort({id: -1}).limit(1);
    resp.forEach(obj =>{
        if(obj){
            let book = {
                id : parseInt(obj.id +1),
                title : req.body.title,
            }
            database.collection('books').insertOne(book, (err, result) =>{
                if (err) res.status(500).send(err);
                res.send('Added Successfully');
            });
        }
    });
});

app.put('/api/books/:id' , (req, res) => {
    let query = {id: parseInt(req.params.id)}
    let book = {
        id : parseInt(req.params.id),
        title : req.body.title,
    }
    let dataSet = {
        $set: book
    }
    database.collection('books').updateOne(query, dataSet, (err, result) =>{
        if (err) throw err
        res.send(book);
    });
});

app.delete('/api/books/:id', (req, res) =>{
    database.collection('books').deleteOne({id : parseInt(req.params.id)}, (err, result) => {
        if(err) throw err;
        res.send(`book ${req.params.id} is deleted`);
        console.log('Data berhasil dihapus');
    })
});







const port = 3001;
app.listen(port, () =>{
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true},(error, result) =>{
        if(error) throw error;
        database = result.db('mydatabase');
        console.log(`server is listening on port ${port}..`);
    });
});
