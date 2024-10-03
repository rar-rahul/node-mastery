const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const homepage = require('../node1/routes/Home.js')
const login = require('../node1/routes/login.js')
const path = require('path')
const router = express.Router()
const authmiddleware = require('./middleware/auth.js')
const auth = require('./middleware/check.js')
const postroutes = require('./routes/post.js')
const routes = require('./routes/registration.js')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')

//config for env file
dotenv.config();
const mongoUrl = process.env.URL
//routes and middelware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//to serve entire static directory 
app.use('/static', express.static(path.join(__dirname, 'staticfiles')))

//database connected
mongoose.connect(mongoUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("database connected"))
.catch((err) => console.error("connection errror"+err))


// router.all('/user',(req,res) => { 
//     console.log("User page is called")
//     res.end()
// })

// const check = (req,res,next) => {
//         console.log("testing midddelware")
//        if(req.method === "post"){
//         next()
//        }else{
//         console.log("error")
//     }
// }

    
//   app.get("/test",(req,res,next)=> { 
//     res.send("This is the get request") 
//     res.end() 
//   }) 

//  app.use(router)

///////////////////////stream creation //////////////
const readbleStream = fs.createReadStream('example.txt')

//handle data event
readbleStream.on('data',(chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
})

//handle end event
readbleStream.on('end',() => {
    console.log("no more data")
})


readbleStream.on('error', (err) => {
    console.error('Error reading the file:', err);
});

//writble stream

const writale = fs.createWriteStream('example.txt')

//handle data event
writale.write("Hellow Rahul test")

writale.end(() => {
    console.log("end writing")
})
///////////////////////



 //apis
 app.post('/register',routes.registration)
 app.post('/login',routes.login)
 app.get('/profile',authmiddleware,routes.profile)
 app.get('/countPost',routes.countPostByAuthor) //by using aggregation


 //crud apis
 app.use('/post',authmiddleware, postroutes)

//middelware routes
// app.use('/', homepage)
// app.use('/', login)


//send static file 
app.use('/',(req,res) => {
    res.sendFile(path.join(__dirname,'img.png'))
})


//server listen
app.listen(port,() => {
    console.log("server listen using expreess")
})