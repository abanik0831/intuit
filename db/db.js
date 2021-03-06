const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

let db;
let url;

if (process.env.NODE_ENV === 'production') {
    const mongoPass = require('../config/secret.json').mongo_db_password;
    url = MongoDB['productionURL']
} else {
    url = 'mongodb://localhost:27017/redDragons';
}
MongoClient.connect(url, (err, dbParam) => {
  assert.equal(null, err);
  console.log('Successfully connected to MongoDB server.');
  db = dbParam;
  db.collection('user').createIndex( { 'email': 1 }, { unique: true } );
});

function getAll(collection) {
    return new Promise((resolve, reject) => {
        db.collection(collection).find({}).toArray((err, result) => {
            if (err) {
                console.log('err', err);
                return reject(err);
            }
            return resolve(result);
        });
    });
}

function getById(collection, id) {
    return new Promise((resolve, reject) => {
        db.collection(collection).find({_id: new ObjectID(id)}).toArray((err, result) => {
            if (err) {
                console.log('err', err);
                return reject(err);
            }
            return resolve(result[0]);
        });
    });
}

function insertOne(collection, obj) {
    return new Promise((resolve, reject) => {
        db.collection(collection).insertOne(obj, (err, result) => {
        if (err) {
            console.log('err', err);
            return reject(err);
        }
        return resolve(result);
        });
    })
}

function updateOne(collection, obj) {
  return new Promise((resolve, reject) => {
    var query = {'_id': ObjectID(obj._id)};
    obj._id = ObjectID(obj._id)
    db.collection(collection).updateOne(query, obj, (err, result) => {
      if (err) {
        console.log('err', err);
        return reject(err);
      }
      return resolve(result);
    });
  });
}

function findOne(collection, query) {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(query).toArray((err, result) => {
            if (err) {
                console.log('err', err);
                return reject(err);
            }
            return resolve(result[0]);
        });
    });
}

module.exports = {
    getAll,
    getById,
    findOne,
    insertOne,
    updateOne,
};