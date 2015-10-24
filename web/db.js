var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var db;

// Connection URL
var url = 'mongodb://192.168.1.41:27017/quickinfo';

MongoClient.connect(url, function(err, database) {
    assert.equal(null, err);
    db = database;
    console.log('database ready');
});

module.exports = db;
