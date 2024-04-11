const express = require('express');

const articleApi = require('./routes/article.js');

const authorApi = require('./routes/author.js');

const cors = require('cors');

require('./config/connect.js');



const app = express();

app.use(cors());

app.use('/article',articleApi);

app.use(express.json());

app.use('/author',authorApi);

app.use('/getimage',express.static('./uploads'));

app.listen(10000,() => {
    console.log('listening on server 3k');
})