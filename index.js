const http = require('http');
const dt = require('./modules/date')
const login = require('./modules/login')
const fs = require('fs')
const url  = require('url')
const events = require('events')
const assert = require('assert');

const eventEmmiter = new events.EventEmitter()

const URLT = new URL("https://nodejs.org/en/download/prebuilt-installer")

console.log( __filename);

// let x = 4;
// let y = 5;

// assert(x > y);


//eventHandler
const getData = () =>  {
    console.log("testing data")
}

//asssign eventHandler
eventEmmiter.on('screme',getData)


//fire on events
eventEmmiter.emit('screme')


http.createServer(function(req,res) {
    fs.rename('test.html','demo.html',(err,data) => {
        if (err) throw err;
        console.log('updated!');
    })
 
}).listen(8000,() => { 
    console.log("test server")
})