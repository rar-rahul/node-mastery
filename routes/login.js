const router = require('express').Router()

router.get('/login',(req,res,next) => { 
    res.send("<h4>This is login page</h4>")
})

module.exports = router