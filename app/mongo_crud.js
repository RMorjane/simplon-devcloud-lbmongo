const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// create url connection to mongodb server
const url = 'mongodb://52.191.251.71:27017';

// Create a new MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true , useNewUrlParser: true});

// create connecting db function
function connect_db(){
    // Use connect method to connect to the Server
    client.connect(function(err) {
        if(err){
            console.log('connection failed');
        }else{
            console.log('Connected successfully to server');
        }
    });
}

// create database function
function create_db(db_name){
    try{
        // create database jobsdb
        const db = client.db(db_name);
        console.log(`database ${db_name} created successfully`);
        return db;       
    }catch{
        console.log('failed to create database');
        return null
    }
}

// create collection function
function create_collection(db,collection_name){
    try{
        // create collection job
        const collection = db.collection(collection_name);
        console.log(`collection ${collection_name} created successfully`);
        return collection;       
    }catch{
        console.log('failed to create collection')
        return null;
    }
}

// create document function
function create_document(collection,document){
    // insert job into the collection
    collection.insertOne(document,function(err,result){
        if (err) throw err;
        console.log('1 document inserted');
    });
}

// find items function
function find_documents(collection, criterias, callback){
    // Find some documents
    collection.find(criterias).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

// update item function
function update_document(collection, update, criterias, callback){
    // Update document where a is 2, set b equal to 1
    collection.updateOne(criterias, { $set: update }, function(err, result) {
        assert.equal(err, null);
        console.log('document updated successfully');
        callback(result);
    }); 
}

// remove document function
function remove_document(collection, criterias, callback){
    collection.deleteMany(criterias, function(err,result){
        assert.equal(err, null);
        console.log('document removed successfully');
        callback(result);
    });
}

module.exports.connect_db = connect_db;
module.exports.create_db = create_db;
module.exports.create_collection = create_collection;
module.exports.create_document = create_document;
module.exports.find_documents = find_documents;
module.exports.update_document = update_document;
module.exports.remove_document = remove_document;