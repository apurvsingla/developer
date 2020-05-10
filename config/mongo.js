const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://apurv:Singla1265@development-1265-bm0af.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("development").collection("1265");
    // perform actions on the collection object
    client.close();
})

module.exports = client;