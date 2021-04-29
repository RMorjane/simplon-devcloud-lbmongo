const {
    connect_db,
    create_db,
    create_collection,
    create_document,
    find_documents,
    update_document,
    remove_document
} = require('./mongo_crud.js');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

connect_db();
const db = create_db('jobsdb');
const collection = create_collection(db,'job');

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello world !!!');   
});

app.get('/find_documents/', (req, res) =>{
    find_documents(collection,{},function(docs){
        res.send(docs);
    })
});

app.get('/create_document/', (req, res) =>{
    const job = {
        id: req.param('id'),
        title: req.param('title')
    }
    create_document(collection,job);
    res.send('job created successfully');
});

app.get('/create_database/', (req, res) => {
    res.set('Content-Type', 'text/html');
    db = create_db('jobsdb');
    if(db!=null) res.send('database created successfully')
    else res.send('failed to create database');
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});