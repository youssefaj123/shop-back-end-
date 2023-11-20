import express, { application } from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose, { mongo } from "mongoose"
import bodyParser from "body-parser"
import compression from "compression"
import firstRouter from "./Routes/products.js"

const App = express()
dotenv.config()
App.use(express.json())
App.use(compression())


App.use(cors(
    {
    origin:['http://localhost:5173','https://shop-26y6.onrender.com']
    }
))

mongoose.connect(process.env.MONGODB_KEY ,
    
    {  socketTimeoutMS: 30000, serverSelectionTimeoutMS: 30000 })
    .then(()=>console.log('connected to db succefully'))
    .catch((err)=>console.log('conected to failed ',err))
 
    const db = mongoose.connection
    db.on('error',(err)=>console.log('failed to cennect to db',err))
    db.once('once',()=>console.log('connected to db succesfully'))
App.use('/products',firstRouter)
App.listen(5000,()=>console.log('en port '))
 
