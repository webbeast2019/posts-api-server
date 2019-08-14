const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'blog';
const mongoose = require('mongoose');
const Post = require('./models/post.model');

// connection
mongoose.connect(`${url}/${dbName}`, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to mongoDB[${dbName}] using mongoose!`)
});

module.exports.creatPost = (postData, callback) => {
  const post = new Post({
    id: postData.id,
    userId: postData.userId,
    title: postData.title,
    body: postData.body
  });

  post.save(function (err, result) {
    assert.strictEqual(null, err);
    console.log('mongoose operation success', result);
    callback(result);
  });
};

module.exports.getAllPosts = (callback) => {
  Post.find(function (err, posts) {
    assert.strictEqual(null, err);
    console.log(`mongoose operation success - got ${posts.length} posts`);
    callback(posts);
  });
};

module.exports.getPostById = (id, callback) => {
  Post.find({id},function (err, post) {
    assert.strictEqual(null, err);
    console.log('mongoose operation success - got post', post);
    callback(post);
  });
};

