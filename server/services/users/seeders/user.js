const {connect, getMongoConnection} = require('../config/connection')

const data = require('../../../data/db.json').users


connect()
.then(async()=>{
    try {
        const db = await getMongoConnection()
        const users = db.collection('users')
        const result = await users.insertMany(data)
        // const deleteSeed = await users.deleteMany()
        console.log(result,"sukses bos");
        // password user contoh yang dimasukan bukan hasil bcrypt
    } catch (error) {
        console.log(error);
    }
})