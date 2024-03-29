const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

const mongoKey = config.mongoKey;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    mongoKey
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log("Deu erro: " + err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
