const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('developer-1265-stiba');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('1265');

client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
    db.collection('1265').updateOne({ owner_id: client.auth.user.id }, { $set: { number: 42 } }, { upsert: true })
).then(() =>
    db.collection('1265').find({ owner_id: client.auth.user.id }, { limit: 100 }).asArray()
).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});

module.exports = client;