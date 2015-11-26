'use strict';

var MongoClient = require('mongodb').MongoClient
var m_db
var url = require('./options.json').db_url


var seneca = require('seneca')();

seneca
  .use('redis-queue-transport')

  .add('role:db,cmd:save', function (args, done) {
    var collection = m_db.collection('documents');
    collection.insert({zed: args.zed}, done)
  })

  .listen({type: 'redis-queue', pin: 'role:db,cmd:*'})


// Connection URL 

MongoClient.connect(url, function(err, db) {
  if (err){
    throw new Error('cannot connect to Mongo')
  }

  m_db = db
  console.log("Connected correctly to server");
});