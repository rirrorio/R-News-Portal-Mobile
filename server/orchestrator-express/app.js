if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const express = require("express");
const port = 4000;
const router = require('./router')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router)
  

app.listen(port, () => {
  console.log(`ORCHESTRATOR-EXPRESS is listening to port ${port}`);
})
