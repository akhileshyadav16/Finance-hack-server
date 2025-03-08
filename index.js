const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4001;
const dbConnect = require("./config/database");

app.use(express.json());


app.listen(PORT,()=>{
    console.log("Server is started at :"+PORT)
})

dbConnect();
