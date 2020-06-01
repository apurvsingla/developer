const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://apurv:Singla%401265@development-1265-bm0af.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to database : MongoDb"));

db.once('open', function() {
    console.log('Connected to DataBase :: MongoDb');
})

module.exports = db;