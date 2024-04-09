const mongoose = require('mongoose');

const { MongoClient } = require('mongodb');


// const uri = "mongodb+srv://admin:admin123@cluster0.ke2ab4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri)
mongoose.connect('mongodb+srv://admin:admin123@cluster0.ke2ab4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(
    () => {
        console.log('connection established');
    }
)
.catch((err) => {console.log(err);});
module.exports = mongoose