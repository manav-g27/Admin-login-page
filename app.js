const { urlencoded } = require('express')
const path = require('path')
const express = require('express')
const app = express()
const jwt =require('jsonwebtoken')
const cors = require('cors')
const Auth = require('./auth')
const connectDB = require('./db/connect')
const Logindata = require('./models/login')
require('dotenv').config({path:'./.env'})

app.use(express.static(path.join(__dirname,'/build')))

app.use(express.json())
app.use(urlencoded({extended:true}));
app.use(cors());

app.post('/login',async (req,res)=>{
console.log(req.body)
const {userName,password} = req.body
//checking for empty input
if(!userName || !password)
{
    return res.status(401).json({msg:"Please enter Username and Password"})
}
//database verification
const verify = await Logindata.findOne({userName})
if(!verify)
{
    return res.status(401).json({msg:"Please enter valid Username and Password"})
}

if(verify.password !=password)
{
    return res.status(401).json({msg:"Incorrect Password !"})
}
const id = verify.id
const token = jwt.sign({id,userName},process.env.JWT_SECRET,{expiresIn:'30d'})
res.status(200).json({msg:"success",token})
})

app.get('/home',Auth,async(req,res)=>{
    res.status(200).json({name:req.userName})
})

app.get('/*',(req,res)=>
{
    res.sendFile(path.join(__dirname,'build','index.html'))
})


const port = process.env.PORT || 5000
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{console.log('port started')})
    }
    catch(err)
    {
        console.log(err)
    }
}
start()