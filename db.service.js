const mongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'blog';

module.exports.creatPost = (postData, callback) => {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.error('Cannot connect to MongoDB!');
            return;
        }
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const cursor = db.collection('posts');
        cursor.insert(postData, function(err, result) {
            console.log('Document Inserted', result);
            callback(result.ops);
        });
        client.close();
    });
};

