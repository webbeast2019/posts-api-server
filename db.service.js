const assert = require('assert');
const mongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'blog';

module.exports.creatPost = (postData, callback) => {
  mongoDo('posts', (cursor) => {
    cursor.insert(postData, function (err, result) {
      assert.strictEqual(null, err);
      console.log('Document Inserted', result);
      callback(result.ops);
    });
  });
};

module.exports.getAllPosts = (callback) => {
  mongoDo('posts', (cursor) => {
    cursor.find({}).toArray(function (err, posts) {
      assert.strictEqual(null, err);
      console.log('Got documents', posts);
      callback(posts);
    });
  });
};

module.exports.getPostById = (id, callback) => {
  mongoDo('posts', (cursor) => {
    cursor.find({id}).toArray(function (err, posts) {
      assert.strictEqual(null, err);
      console.log('Got documents', posts);
      callback(posts);
    });
  });
};

function mongoDo(collectionName, actionFn) {
  mongoClient.connect(url, function (err, client) {
    if (err) {
      console.error('Cannot connect to MongoDB!');
      return;
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const cursor = db.collection(collectionName);
    actionFn(cursor);
    client.close();
  });
}
