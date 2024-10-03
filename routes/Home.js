const expreess = require('express')
const router = expreess.Router()


router.get('/home', (req,res,next) => {
        res.send("<h2>This is home page</h2>")
})


module.exports = router