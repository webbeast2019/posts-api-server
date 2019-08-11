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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
