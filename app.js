const express = require('express');
const { connectDB } = require('./db');
const router = require('./router/empRouter');
const session = require('express-session');
const app = express()
connectDB()
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:"test",
    resave:false,
    saveUninitialized:false
}))
app.use("/",router)

app.listen(3000,()=>{
    console.log("running..");
    
})