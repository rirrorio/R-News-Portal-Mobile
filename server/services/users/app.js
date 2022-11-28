if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const express = require ('express')
const app = express()
const port = 4001 || process.env.PORT
const router = require('./routes/router')
const {connect} = require ('./config/connection')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', router)

connect()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`SERVER-USERS running at port ${port}`);
    })
})
.catch((err)=>console.log(err))