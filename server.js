const express = require('express');
const app = express();
const dbService = require('./db.service');
app.use(express.json());

app.post('/api/posts',(req,res)=>{
    const post = req.body;

    dbService.creatPost(post, (newItemInDB) => {
        res.send(newItemInDB);
    });
});

app.get('/api/posts', (req, res) => {
    dbService.getAllPosts((data) => {
        res.send(data)
    })
});

app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    dbService.getPostById(id, (data) => {
        res.send(data)
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
