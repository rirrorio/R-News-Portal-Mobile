const {MongoClient} = require ('mongodb')
const uri = 'mongodb+srv://rirrorio:Hujan4ngin@cluster0.qlhnrnt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri)

let mongoConnection
async function connect(){
    try {
        const connection = await client.connect()
        const db = client.db("P3C2-server-for-user")
        // console.log(db);
        mongoConnection = db
    } catch (error) {
        throw error
    }
}

async function getMongoConnection(){
    return mongoConnection
}

module.exports = {connect, getMongoConnection}