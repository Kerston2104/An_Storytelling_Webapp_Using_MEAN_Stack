const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/collaboratales')
.then(
    () => {
        console.log('connection established');
    }
)
.catch((err) => {console.log(err);});
module.exports = mongoose